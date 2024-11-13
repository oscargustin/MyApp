import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarQrprofePageRoutingModule } from './generar-qrprofe-routing.module';

import { GenerarQrprofePage } from './generar-qrprofe.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarQrprofePageRoutingModule,
    ComponentsModule
],
  declarations: [GenerarQrprofePage]
})
export class GenerarQrprofePageModule {}
