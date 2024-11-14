import { Component, OnInit } from '@angular/core';
import { Firestore, doc, setDoc, collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { QrCodeService } from 'src/app/services/qr-code.service'; // Importa el servicio QR

@Component({
  selector: 'app-generar-qrprofe',
  templateUrl: './generar-qrprofe.page.html',
  styleUrls: ['./generar-qrprofe.page.scss'],
})
export class GenerarQrprofePage implements OnInit {
  asignaturas: any[] = [];
  asignaturaSeleccionada!: string;
  ubicacion!: string;
  fecha!: string;
  qrCodeDataUrl!: string;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private firestore: Firestore,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private qrCodeService: QrCodeService // Inyecta el servicio QR
  ) {}

  async ngOnInit() {
    this.cargarAsignaturas();
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  volver() {
    this.navCtrl.back(); // Navega a la página anterior
  }

  async cargarAsignaturas() {
    const asignaturasFireStore = collection(this.firestore, 'asignatura');
    const query = await getDocs(asignaturasFireStore);
    this.asignaturas = query.docs.map(documento => ({
      id: documento.id,
      nombre: documento.data()['nombre'],
    }));
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }

  async generarQR() {
    const usuario_id = this.authService.getCurrentUserUid();
    if (!this.asignaturaSeleccionada) {
      this.showToast('Por favor selecciona una asignatura.', 'warning');
      return;
    }
  
    const timestamp = new Date().getTime(); // Genera un timestamp único
    const claseRef = doc(this.firestore, `clase/${this.asignaturaSeleccionada}-${timestamp}`);
    console.log(`Timestamp: ${timestamp} - ClaseRef ID: ${claseRef.id} - usuario_id: ${usuario_id} - asignatura: ${this.asignaturaSeleccionada}`);

    await setDoc(claseRef, {
      asignatura_id: this.asignaturaSeleccionada,
      usuario_id: usuario_id,
      timestamp: new Date(), // Guarda la fecha/hora actual en Firestore
    });

    const codigoQR = `${this.asignaturaSeleccionada}-${timestamp}`;
    
    // Usa el servicio QrCodeService para generar el QR
    try {
      this.qrCodeDataUrl = await this.qrCodeService.generateQRCode(codigoQR);
      this.showToast('Código QR generado exitosamente.', 'success');
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      this.showToast('Error al generar el código QR.', 'danger');
    }
  }
}
