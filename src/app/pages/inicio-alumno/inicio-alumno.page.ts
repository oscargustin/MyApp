import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, PopoverController, MenuController } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';
import { Itemlist } from 'src/app/Interfaces/itemlist';
import { PerfilPopoverPage } from '../perfil-popover/perfil-popover.page';
import { StorageService } from 'src/app/services/storage.service';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit, OnDestroy {
  nombre: string = '';
  private backButtonSubscription: any;

  constructor(
    private platform: Platform,
    private popoverController: PopoverController,
    private menuController: MenuController,
    private navigationService: NavigationService,
    private storageService: StorageService,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.navigationService.setCurrentPage('inicio');
    this.cargarDatosAlumno();

    //Escuchar el evento de retroceso y guardar la suscripción
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.navigationService.isHomePage()) {
        // Acciones específicas al presionar retroceso en la página de inicio
      }
    });
  }

  ngOnDestroy() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  async cargarDatosAlumno() {
    // try {
    //   const userUid = await this.storageService.getData('user');
    //    // Verificar si el UID está correcto

    //   if (!userUid) {
    //     console.error('UID no encontrado en el almacenamiento local');
    //     this.nombre = 'Usuario no identificado';
    //     return;
    //   }

    //   // Intenta cargar los datos desde el almacenamiento local
    //   const localData = await this.storageService.getData('user');
    //   if (localData && this.nombre) {
    //     this.nombre = localData.nombre; // Usa el nombre almacenado localmente
    //     return;
    //   }

    //   // Si no hay datos locales, consulta Firestore usando where
    //   const usersCollection = collection(this.firestore, 'users');
    //   const userQuery = query(usersCollection, where('uid', '==', userUid));
    //   const querySnapshot = await getDocs(userQuery);

    //   if (!querySnapshot.empty) {
    //     // Obtén los datos del primer documento encontrado
    //     const userData = querySnapshot.docs[0].data();
    //     this.nombre = userData?.['nombre'] || 'Usuario'; // Valor predeterminado

    //     // Guarda los datos en el almacenamiento local para uso offline
    //     await this.storageService.saveData('userData', userData);
    //   } else {
    //     console.error('No se encontró el usuario en Firestore');
    //     this.nombre = 'Usuario no encontrado';
    //   }
    // } catch (error) {
    //   console.error('Error al cargar datos del usuario:', error);
    //   this.nombre = 'Error al cargar datos';
    // }
  }
  
  
  
  async openPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: PerfilPopoverPage,
      event: event, 
      translucent: true 
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
