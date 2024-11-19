import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, PopoverController, MenuController } from '@ionic/angular';
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
    if (this.backButtonSubscription){
    this.backButtonSubscription.unsubscribe();
  }
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

  mostrarMenu(){
    this.menuController.open('first');
  }

  

  // Lista de enlaces para navegación (ya existente)
  vinculos: Itemlist[] = [
    { ruta: '/asistencia', titulo: 'Asistencia', icono: 'accessibility-outline' },
    { ruta: '/registrar-asistencia', titulo: 'Registrar Asistencia', icono: 'barcode-outline' },
  ];
}
