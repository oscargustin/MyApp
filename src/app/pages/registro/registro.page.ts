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

    // Intentar registrar usuario
    try {
      console.log('Intentando registrar usuario con correo:', this.email);
      const result = await this.authService.register(
        this.email, this.password, this.nombre, this.apellidos, this.nombreUsuario
      ).toPromise();
    
      if (result) {
        const user = {
          email: this.email,
          password: this.password, // Considera cifrarla
          nombre: this.nombre,
          apellidos: this.apellidos,
          nombreUsuario: this.nombreUsuario
        };
        JSON.stringify(user);
    
        await this.storageService.saveData('user', user);
        this.showToast('¡Registro exitoso!', 'success');
    
        // Redirige según el tipo de usuario
        const redirectRoute = this.email.includes('@profesorduoc.com') 
          ? '/inicio-profe' 
          : this.email.includes('@duocuc.com') 
            ? '/inicio-alumno' 
            : '/login';
    
        this.router.navigate([redirectRoute], {
          queryParams: { email: this.email, password: this.password },
        });
      }
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      const errorMsg = error.message || 'Ocurrió un error durante el registro.';
      this.showToast(errorMsg, 'danger');
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
