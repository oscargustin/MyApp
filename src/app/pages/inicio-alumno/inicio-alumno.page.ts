import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, AlertController, PopoverController, MenuController } from '@ionic/angular';
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

  

  async openPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: PerfilPopoverPage,
      event: event, // El evento para posicionar el popover
      translucent: true // Hace que el popover tenga fondo translúcido
    });
    await popover.present();
  }
  
  
  mostrarMenu(){
    this.menuController.open('first');
  }

  vinculos: Itemlist[] = [
    { ruta: '/', titulo: 'Asistencia', icono: 'accessibility-outline' },
    { ruta: '/registrar-asistencia', titulo: 'Registrar Asistencia', icono: 'barcode-outline' },
  ];
}
