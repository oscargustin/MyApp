import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasprofePageRoutingModule } from './asignaturasprofe-routing.module';

import { AsignaturasprofePage } from './asignaturasprofe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasprofePageRoutingModule
  ],
  declarations: [AsignaturasprofePage]
})
export class AsignaturasprofePageModule {}
