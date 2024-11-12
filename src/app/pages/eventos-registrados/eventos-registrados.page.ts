import { Component, OnInit } from '@angular/core';
import { Firestore, doc, setDoc, collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-eventos-registrados',
  templateUrl: './eventos-registrados.page.html',
  styleUrls: ['./eventos-registrados.page.scss'],
})
export class EventosRegistradosPage implements OnInit {
  asignaturas: any[] = ['lenguaje', 'historia','historia','historia'];
  asignaturaSeleccionada!: string;
  ubicacion!: string;
  fecha!: string;
  qrCodeDataUrl!: string;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.cargarAsignaturas();
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  async cargarAsignaturas() {
    const asignaturasFireStore = collection(this.firestore, 'asignatura');
    const query = await getDocs(asignaturasFireStore);
    this.asignaturas = query.docs.map(documento => ({
      id: documento.id,
      nombre: documento.data()['nombre'],
    }));
  }

  async generarQR() {
    const profesorId = this.authService.getCurrentUserUid();
    if (!this.asignaturaSeleccionada) {
      console.error('Por favor selecciona una asignatura.');
      return;
    }
  
    const timestamp = new Date().getTime(); // Generar un timestamp único
    const claseRef = doc(this.firestore, `clase/${this.asignaturaSeleccionada}-${timestamp}`);
  
    await setDoc(claseRef, {
      asignatura_id: this.asignaturaSeleccionada,
      profesor_id: profesorId,
      timestamp: new Date(), // Guarda la fecha/hora actual en Firestore
    });
  
    const codigoQR = `${this.asignaturaSeleccionada}-${timestamp}`;
    this.qrCodeDataUrl = await QRCode.toDataURL(codigoQR);
  }
  
}
