import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent  implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  volver() {
    this.navCtrl.back(); // Navega a la página anterior
  }
}
