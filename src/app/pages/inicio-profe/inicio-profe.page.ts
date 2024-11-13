import { Component, OnInit } from '@angular/core';
import { Itemlist } from 'src/app/Interfaces/itemlist';
import { NavController, PopoverController,MenuController } from '@ionic/angular';
import { PerfilPopoverPage } from '../perfil-popover/perfil-popover.page'; // Importa el componente

@Component({
  selector: 'app-inicio-profe',
  templateUrl: './inicio-profe.page.html',
  styleUrls: ['./inicio-profe.page.scss'],
})
export class InicioProfePage implements OnInit {
  constructor(private navCtrl: NavController, private popoverController: PopoverController, private menuController:MenuController) { }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back(); 
  }

  mostrarMenu(){
    this.menuController.open('first');
  }
  
  
  async openPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: PerfilPopoverPage,
      event: event, // El evento para posicionar el popover
      translucent: true // Hace que el popover tenga fondo translúcido
    });
    await popover.present();
  }
  

  vinculos: Itemlist[] = [
    {
      ruta: '/asignaturasprofe',
      titulo: 'Asignaturas',
      icono: 'book-outline'
    },
    { ruta: '/generar-qrprofe', titulo: 'Generar Qr Para Asistencia', icono: 'qr-code-outline' },
];
}