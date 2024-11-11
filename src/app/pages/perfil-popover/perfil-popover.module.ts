import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPopoverPageRoutingModule } from './perfil-popover-routing.module';

import { PerfilPopoverPage } from './perfil-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPopoverPageRoutingModule
  ],
  declarations: [PerfilPopoverPage]
})
export class PerfilPopoverPageModule {}
