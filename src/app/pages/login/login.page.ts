import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';  // Variable para almacenar el email ingresado
  password: string = ''; 

  constructor(private router:Router,
              private alertcontroller: AlertController) { }
  ngOnInit() {
  }

  limpiar(){  
    this.email="";
  }

  async iniciarSesion() {
    if (this.email.trim() !== '') {
      localStorage.setItem('email', this.email);
      const alert = await this.alertcontroller.create({
        mode:'ios',
        message:'¡Bienvenid@ '+ this.email+'!',
        buttons: [
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              localStorage.setItem('email', this.email);
              this.limpiar();
              this.router.navigate(['/eventos']);
            },
          },
        ],
      });

      await alert.present(); 
  }else {
    const alert = await this.alertcontroller.create({
      message: 'Por favor, ingrese un correo válido.',
      buttons: ['OK']
    });
    await alert.present();
  }
}


  recuperarPassword(){
    this.router.navigate(['/recuperar-password'])
  }

  registrarse(){
    this.router.navigate(['/registro'])
  }
}
