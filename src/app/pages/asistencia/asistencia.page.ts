import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asignaturas: any[] = [];

  constructor(private asignaturaService: AsignaturaService) {}

  async ngOnInit() {
    this.asignaturas = await this.asignaturaService.obtenerAsignaturasPorUsuario();
  }
}