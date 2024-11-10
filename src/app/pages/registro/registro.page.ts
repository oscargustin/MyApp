import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  apellidos: string = '';
  nombreUsuario: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async registrar() {
    // Validación de campos vacíos
    if (!this.nombre || !this.apellidos || !this.nombreUsuario || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Por favor, rellene todos los campos.', 'secondary');
      return;
    }
  
    // Validación de que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.showToast('Las contraseñas no coinciden.', 'secondary');
      return;
    }
  
    // Validación del formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.email)) {
      this.showToast('Por favor, ingrese un correo electrónico válido.', 'secondary');
      return;
    }
  
    // Intentar registrar usuario
    try {
      const result = await this.authService.register(this.email, this.password).toPromise();
  
      if (result) { // Si el registro fue exitoso
        this.showToast('¡Registro exitoso!', 'success');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      // Imprime el error completo en la consola
      console.error('Error al registrar usuario:', error);
      
      // Llama al manejador de errores con el código de error
      this.authService.handleError(error.code);
      
      // Si el error tiene detalles adicionales, imprímelos también
      if (error.message) {
        console.error('Mensaje de error:', error.message);
      }
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }
  }
  
  

  // Mostrar mensaje temporal
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}
