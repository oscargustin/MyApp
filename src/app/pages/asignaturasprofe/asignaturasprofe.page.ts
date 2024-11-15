import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturasprofe',
  templateUrl: './asignaturasprofe.page.html',
  styleUrls: ['./asignaturasprofe.page.scss'],
})
export class AsignaturasprofePage implements OnInit {
  asignaturas: any[] = [];

  constructor(private asignaturaService: AsignaturaService, private navCtrl: NavController ) {}

  async ngOnInit() {
    this.asignaturas = await this.asignaturaService.obtenerAsignaturasPorUid(); // Obtener asignaturas
    console.log(this.asignaturas); // Verifica en la consola si se obtienen correctamente
  }
  volver() {
    this.navCtrl.back(); // Navega a la página anterior
  }
}

