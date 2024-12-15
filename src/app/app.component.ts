import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

interface Opciones{
  icon:string;
  name:string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opciones: Opciones[]=[
    {
      icon: 'person-circle-sharp',
      name: 'Perfil',
      redirecTo: '/perfil'
    },
    {
      icon: 'log-out-sharp',
      name: 'Cerrar sesión',
      redirecTo: '/login'
    },
  ]
  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el log out
  async logOut() {
    try {
      await this.authService.logOut(); // Llamada al método logOut de tu servicio
      this.router.navigate(['/login']); // Redirige a la página de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}