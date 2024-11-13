import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [CabeceraComponent],
  imports: [CommonModule,IonicModule],
  exports: [CabeceraComponent], // Asegúrate de exportar el componente
})
export class ComponentsModule {}
