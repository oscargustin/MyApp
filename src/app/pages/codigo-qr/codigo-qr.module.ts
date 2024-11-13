import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoQRPageRoutingModule } from './codigo-qr-routing.module';
import { ComponentsModule } from './../../components/components.module';
import { CodigoQRPage } from './codigo-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoQRPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CodigoQRPage]
})
export class CodigoQRPageModule {}
