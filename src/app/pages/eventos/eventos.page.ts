import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  email: string = '';

  constructor(
    private menuController: MenuController,
    private alertcontroller: AlertController,
    private router: Router) {}

    onClick()
  {}  
  ngOnInit() { this.email = localStorage.getItem('email') || 'Usuario'; 
  }

  async registrarEvento(){
    const alert = await this.alertcontroller.create({
      header: '¿Estás seguro de registrarte a este evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Registro de evento cancelado.');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Evento registrado con éxito.');
            this.router.navigate(['/eventos-registrados'])
          },
        },
      ],
    });

    await alert.present();
}

  mostrarMenu(){
    this.menuController.open('first');
  }
}

  
