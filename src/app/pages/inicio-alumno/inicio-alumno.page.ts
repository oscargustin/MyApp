import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, AlertController, PopoverController, MenuController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';  // Asegúrate de importar BarcodeScanner
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Itemlist } from 'src/app/Interfaces/itemlist';
import { PerfilPopoverPage } from '../perfil-popover/perfil-popover.page';

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit, OnDestroy {
  private backButtonSubscription: any;

  constructor(
    private platform: Platform,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private authService: AuthService,
    private menuController: MenuController,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.navigationService.setCurrentPage('inicio');

    // Escuchar el evento de retroceso y guardar la suscripción
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.navigationService.isHomePage()) {
      }
    });
  }

  ngOnDestroy() {
    // Desuscribirse del evento de retroceso cuando se abandona InicioPage
    this.backButtonSubscription.unsubscribe();
  }

  // Método para abrir el popover (ya existente)
  async openPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: PerfilPopoverPage,
      event: event, // El evento para posicionar el popover
      translucent: true // Hace que el popover tenga fondo translúcido
    });
    await popover.present();
  }

  // Método para mostrar el menú (ya existente)
  mostrarMenu(){
    this.menuController.open('first');
  }

  // Método para escanear el código QR
  async scanQRCode() {
    try {
      // Solicitar permisos para usar la cámara
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) {
        return;
      }

      // Iniciar el escaneo
      document.querySelector('body')?.classList.add('barcode-scanner-active');  // Añadir clase para ocultar UI

      const listener = await BarcodeScanner.addListener('barcodeScanned', async (result) => {
        if (result && result.barcode) {
          console.log('Código QR escaneado:', result.barcode);
          this.handleScanResult(result.barcode.valueType);  // Aquí pasamos result.barcode, que es de tipo string
        } else {
          console.error('No se escaneó ningún código QR.');
        }

        // Detener escaneo y quitar clase de UI
        document.querySelector('body')?.classList.remove('barcode-scanner-active');
        await BarcodeScanner.stopScan();
        await listener.remove();  // Remover el listener
      });

      await BarcodeScanner.startScan();
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
    }
  }

  // Método para manejar el resultado del escaneo
  private handleScanResult(result: string) {
    // Aquí puedes manejar el contenido del código QR escaneado
    console.log('Resultado del código QR:', result);
    // Por ejemplo, podrías navegar a una página con el resultado
    // this.router.navigate([`/some-page/${result}`]);
  }

  // Método para verificar y solicitar permisos de cámara
  private async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    if (camera !== 'granted') {
      const { camera: newCameraPermission } = await BarcodeScanner.requestPermissions();
      return newCameraPermission === 'granted';
    }
    return true;
  }

  // Lista de enlaces para navegación (ya existente)
  vinculos: Itemlist[] = [
    { ruta: '/asistencia', titulo: 'Asistencia', icono: 'accessibility-outline' },
    { ruta: '/registrar-asistencia', titulo: 'Registrar Asistencia', icono: 'barcode-outline' },
  ];
}
