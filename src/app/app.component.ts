import { Component } from '@angular/core';

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
      icon: 'bookmark-sharp',
      name: 'Mis eventos',
      redirecTo: '/eventos-registrados'
    },
    {
      icon: 'log-out-sharp',
      name: 'Cerrar sesión',
      redirecTo: '/login'
    },
  ]

  constructor() {}
}