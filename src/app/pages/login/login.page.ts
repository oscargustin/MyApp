import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';  // Asegúrate de importar tu servicio de almacenamiento
import { firstValueFrom } from 'rxjs';

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
    private storageService: StorageService  // Inyecta el servicio de almacenamiento
  ) {}

  async onLogin() {
    console.log('Intentando iniciar sesión con:', this.email, this.password);
    const result = await this.authService.login(this.email, this.password);
    
  
    if (result.success) {
      if (this.email.includes('@profesorduoc.com')) {
        this.router.navigate(['/inicio-profe']);
      } else if (this.email.includes('@duocuc.com')) {
        this.router.navigate(['/inicio-alumno']);
      } else {
        // Navegación o mensaje por defecto si no se cumple ninguna de las anteriores
        this.router.navigate(['/inicio']);
      }
    } else {
      this.handleLoginError(result.message);
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

  async loginOffline() {
    // Intenta obtener los datos almacenados de registro
    const registro = await this.storageService.getData('registro');

    // Verifica si los datos están almacenados
    if (!registro) {
      this.showToast('No se encontraron datos almacenados de registro.', 'warning');
      return;
    }

    // Verifica si el correo y la contraseña coinciden con los datos almacenados
    if (registro.success) {
      if (this.email.includes('@profesorduoc.com')) {
        this.router.navigate(['/inicio-profe']);
      } else if (this.email.includes('@duocuc.com')) {
        this.router.navigate(['/inicio-alumno']);
      } else {
        // Navegación o mensaje por defecto si no se cumple ninguna de las anteriores
        this.router.navigate(['/inicio']);
      }
    } else {
      this.handleLoginError(registro.message);
    }
  }

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



