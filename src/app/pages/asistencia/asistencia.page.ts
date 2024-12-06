import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencias: any[] = [];
  filteredAsistencias: any[] = [];
  userUid: string | null = null;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    // Obtener el UID del usuario logueado
    this.userUid = await this.authService.getCurrentUserUid();

    if (this.userUid) {
      await this.mostrarAsistenciasLocales(); // Cargar asistencias filtradas
    } else {
      console.log('No se encontró UID del usuario logueado.');
    }
  }

  async mostrarAsistenciasLocales() {
    const asistencias = await this.storageService.getArray('asistencias');
    console.log('Asistencias locales:', asistencias);

    // Filtrar las asistencias según el UID del usuario logueado
    this.filteredAsistencias = asistencias.filter(
      (asistencia) => asistencia.alumnoId === this.userUid
    );
  }
}
