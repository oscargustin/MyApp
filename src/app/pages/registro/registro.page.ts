import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

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
    private toastController: ToastController,
    private storageService:StorageService
  ) {}

  ngOnInit() {
    this.registrarData();
}

async registrarData() {
  
    console.log('Iniciando registro...');
    // Validación de campos vacíos
    if (!this.nombre || !this.apellidos || !this.nombreUsuario || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Por favor, rellene todos los campos.', 'warning');
      console.log('Campos vacíos detectados:', { nombre: this.nombre, apellidos: this.apellidos, nombreUsuario: this.nombreUsuario, email: this.email, password: this.password, confirmPassword: this.confirmPassword });
      return;
    }

    // Validación de que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.showToast('Las contraseñas no coinciden.', 'warning');
      console.log('Las contraseñas no coinciden:', { password: this.password, confirmPassword: this.confirmPassword });
      return;
    }

    // Validación del formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.email)) {
      this.showToast('Por favor, ingrese un correo electrónico válido.', 'warning');
      console.log('Correo electrónico inválido:', this.email);
      return;
    }

    // Guardar los datos en el almacenamiento local
    const registro = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      nombreUsuario: this.nombreUsuario,
      email: this.email,
      password: this.password, // Aunque puedes no almacenar contraseñas en almacenamiento local
    };
    
    console.log('Guardando datos de registro:', registro);

    // Guardar el objeto con los datos en el almacenamiento local
    await this.storageService.saveData('registro', registro);
    console.log('Datos guardados en el almacenamiento local.');

    // Intentar registrar usuario
    try {
      console.log('Intentando registrar usuario con correo:', this.email);
      const result = await this.authService.register(this.email, this.password, this.nombre, this.apellidos, this.nombreUsuario).toPromise();
  
      if (result) {
        this.showToast('¡Registro exitoso!', 'success');
        if (this.email.includes('@profesorduoc.com')) {
          this.router.navigate(['/inicio-profe']);
        } else if (this.email.includes('@duocuc.com')) {
          this.router.navigate(['/inicio-alumno']);
        } // Si el registro fue exitoso
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
    console.log(`Toast presentado: ${message} con color ${color}`);
  }
}
