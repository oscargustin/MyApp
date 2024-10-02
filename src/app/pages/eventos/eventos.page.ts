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

  recuperarPassword() {
    this.router.navigate(['/recuperar-password']);
  }

  async cerrarSesion() {
    const alert = await this.alertcontroller.create({
      mode: 'ios',
      message: '¡Hasta pronto, ' + this.email + '!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.limpiar();
            this.menuController.close();
            this.router.navigate(['/login']); 
          },
        },
      ],
    });
    await alert.present();
  }

  limpiar(){  
    this.email="";
  }
  
  mostrarMenu() {
    this.menuController.open('first');
  }
}
