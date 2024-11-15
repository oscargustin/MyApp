import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';  // Variable para almacenar el email ingresado
  password: string = ''; 

  constructor(private authService: AuthService,
              private router: Router,
              private toastController: ToastController) { }
  ngOnInit() {
  }

  limpiar(){  
    this.email="";
  }
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
        this.showToast('Credenciales invalidas.' + errorCode, 'warning');
        break;
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
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
