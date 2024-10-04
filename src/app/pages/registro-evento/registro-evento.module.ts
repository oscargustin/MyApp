import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEventoPageRoutingModule } from './registro-evento-routing.module';

import { RegistroEventoPage } from './registro-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEventoPageRoutingModule
  ],
  declarations: [RegistroEventoPage]
})
export class RegistroEventoPageModule {}
