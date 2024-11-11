import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPopoverPage } from './perfil-popover.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPopoverPageRoutingModule {}
