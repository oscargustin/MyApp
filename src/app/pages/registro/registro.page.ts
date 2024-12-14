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
  
  if (!this.nombre || !this.apellidos || !this.nombreUsuario || !this.email || !this.password || !this.confirmPassword) {
    this.showToast('Por favor, rellene todos los campos.', 'warning');
    console.log('Campos vacíos detectados:', { nombre: this.nombre, apellidos: this.apellidos, nombreUsuario: this.nombreUsuario, email: this.email, password: this.password, confirmPassword: this.confirmPassword });
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.showToast('Las contraseñas no coinciden.', 'warning');
    console.log('Las contraseñas no coinciden:', { password: this.password, confirmPassword: this.confirmPassword });
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(this.email)) {
    this.showToast('Por favor, ingrese un correo electrónico válido.', 'warning');
    console.log('Correo electrónico inválido:', this.email);
    return;
  }
  
  const allowedDomains = ['@duocuc.cl', '@profesorduoc.cl'];
  const emailDomain = this.email.substring(this.email.lastIndexOf('@'));
  if (!allowedDomains.includes(emailDomain)) {
    this.showToast('El correo electrónico debe tener uno de los dominios permitidos: @duocuc.cl o @profesorduoc.cl.', 'warning');
    console.log('Dominio de correo no permitido:', this.email);
    return;
  }

  try {
    console.log('Intentando registrar usuario con correo:', this.email);
    await this.authService.register(
      this.email, this.password, this.nombre, this.apellidos, this.nombreUsuario
    ).toPromise();

    const user = {
      email: this.email,
      nombre: this.nombre,
      apellidos: this.apellidos,
      nombreUsuario: this.nombreUsuario
    };

    await this.storageService.saveData('user', user);
    this.showToast('¡Registro exitoso!', 'success');
    this.router.navigate(['/login']); // Redirige al login después del registro exitoso
  } catch (error: any) {
    console.error('Error al registrar usuario:', error);
    this.showToast(error.message || 'Ocurrió un error durante el registro.', 'danger');
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
