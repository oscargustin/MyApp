import { Component,  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage {
  email: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private toastCtrl: ToastController, private router:Router) {}

  // Método para enviar correo de restablecimiento de contraseña
  async resetPassword() {
    if (!this.email) {
      this.showToast('Por favor, ingresa un correo válido.', 'danger');
      return;
    }
  
    try {
      // Verifica si el correo está registrado
      console.log('Validando correo:', this.email);
      const isRegistered = await this.authService.isEmailRegistered(this.email);
      console.log('Correo registrado:', isRegistered);
      if (!isRegistered) {
        this.showToast('El correo ingresado no está registrado.', 'danger');
        return;
      }
  
      // Envía el correo de restablecimiento si el correo está registrado
      await this.authService.resetPassword(this.email);
      this.showToast('Correo enviado. Serás redirigido al login.', 'success');
  
      // Redirige al login después de un delay
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } catch (error: any) {
      console.error('Error en el flujo de cambio de contraseña:', error);
      this.showToast(error.message || 'Ocurrió un error. Intenta nuevamente.', 'danger');
    }
  }
  
  

  // Obtener mensaje de error personalizado
  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El correo ingresado no es válido.';
      case 'auth/user-not-found':
        return 'No existe ningún usuario con este correo.';
      default:
        return 'Ocurrió un error. Intenta nuevamente.';
    }
  }

  // Mostrar un Toast
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}