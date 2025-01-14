import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService} from 'src/app/services/storage.service';  // Asegúrate de importar tu servicio de almacenamiento
import { Network } from '@capacitor/network';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private storageService: StorageService,
    private route: ActivatedRoute
    // Inyecta el servicio de almacenamiento
  ) {}
//AÑADI CHECKNETWORKSTATUS AL ONINIT, DENTRO DE LA SUB
ngOnInit() {
  this.route.queryParams.subscribe((params) => {
    if (params['email'] && params['password']) {
      this.email = params['email'];
      this.password = params['password'];
    }
  });

  // Registrar listener para cambios de red
  Network.addListener('networkStatusChange', (status) => {
    console.log('Estado de red cambiado:', status);
    if (!status.connected) {
      this.showToast('Sin conexión a internet. Modo offline activado.', 'warning');
    }
  });

  // Comprobar el estado inicial de la red
  this.checkNetworkStatus();
}

async checkNetworkStatus() {
  const status = await Network.getStatus();
  console.log('Estado actual de la red:', status.connected ? 'Online' : 'Offline');
  return status.connected;
}

async onLogin() {
  const hasInternet = await this.checkNetworkStatus();
  if (hasInternet) {
    // Intentar login en línea
    try {
      const result = await this.authService.login(this.email, this.password);
      if (result.success) {
        this.redirectUserBasedOnEmail(this.email);
      } else {
        this.handleLoginError(result.message);
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión en línea:', error);
      this.showToast('Error de conexión o credenciales incorrectas.', 'danger');
    }
  } else {
    // Login offline
    try {
      const storedUserData = await this.storageService.getData('user');
      console.log('Datos recuperados de localStorage:', storedUserData);

      
      if (storedUserData) {
        const storedUser = storedUserData; // Validar si la estructura coincide
        if (storedUser.email === this.email && storedUser.password === this.password) {
          this.showToast('Iniciando sesión en modo offline.', 'success');
          this.redirectUserBasedOnEmail(this.email);
        } else {
          this.showToast('Sin conexión y credenciales no válidas.', 'danger');
        }
      } else {
        this.showToast('Sin conexión y no hay datos almacenados.', 'danger');
      }
    } catch (error: any) {
      console.error('Error al acceder al almacenamiento local:', error);
      this.showToast('Error al recuperar datos en modo offline.', 'danger');
    }
  }
}

// Helper para redirigir al usuario
private redirectUserBasedOnEmail(email: string) {
  if (email.includes('@profesorduoc.com')) {
    this.router.navigate(['/inicio-profe']);
  } else if (email.includes('@duocuc.com')) {
    this.router.navigate(['/inicio-alumno']);
  } else {
    this.router.navigate(['/inicio']);
  }
}


  handleLoginError(errorCode: string) {
      console.error('Error de inicio de sesión:', errorCode); 
      switch (errorCode) {
        case 'auth/missing-password':
          this.showToast('Ingrese una contraseña.', 'warning');
          break;
        case 'auth/invalid-email':
          this.showToast('Correo inválido.', 'warning');
          break;
        default:
          this.showToast('Credenciales invalidas.', 'warning');
          break;
      }
    }

  // async loginOffline() {
  //   // Intenta obtener los datos almacenados de registro
  //   const registro = await this.storageService.getData('registro');
  //   // Verifica si los datos están almacenados
  //   if (!registro) {
  //     this.showToast('No se encontraron datos almacenados de registro.', 'warning');
  //     return;
  //   }

  //   // Verifica si el correo y la contraseña coinciden con los datos almacenados
  //   if (registro.success) {
  //     if (this.email.includes('@profesorduoc.com')) {
  //       this.router.navigate(['/inicio-profe']);
  //     } else if (this.email.includes('@duocuc.com')) {
  //       this.router.navigate(['/inicio-alumno']);
  //     } else {
  //       // Navegación o mensaje por defecto si no se cumple ninguna de las anteriores
  //       this.router.navigate(['/inicio']);
  //     }
  //   } else {
  //     this.handleLoginError(registro.message);
  //   }
  // }

  // Mostrar mensaje temporal
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // Mostrar durante 2 segundos
      color,          // Color basado en el tipo de mensaje
      position: 'top',
    });
    toast.present();
  }
  recuperarPassword(){
    this.router.navigate(['/recuperar-password'])
  }

  registrarse(){
    this.router.navigate(['/registro'])
  }
}



