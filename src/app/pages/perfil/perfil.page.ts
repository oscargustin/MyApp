import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  apellidos: string = '';
  nombreUsuario: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  // Cargar el perfil del usuario desde localStorage
  async loadUserProfile() {
    const currentUserUid = this.authService.getCurrentUserUid(); // Obtener el UID del usuario actual
  
    if (currentUserUid) {
      // Obtener los datos del usuario específico por su UID
      const userProfileData = await this.storageService.getData(currentUserUid);
  
      if (userProfileData) {
        this.nombre = userProfileData.nombre;
        this.apellidos = userProfileData.apellidos;
        this.nombreUsuario = userProfileData.nombreUsuario;
        this.email = userProfileData.email;
      }
    }
  }
  

  // Actualizar los datos del perfil
  async updateProfile() {
    const userData = await this.storageService.getData('user');
    if (!userData) {
      this.showToast('No se encontraron datos de usuario.', 'warning');
      return;
    }

    const { uid } = userData;
    await this.authService.updateUserProfile(
      uid,
      this.nombre,
      this.apellidos,
      this.nombreUsuario,
      this.email
    );
  }

  // Mostrar mensaje temporal
  async showToast(message: string, color: string) {
    const toast = await this.authService.showToast(message, color);
  }
}