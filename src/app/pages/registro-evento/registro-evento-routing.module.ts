import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEventoPage } from './registro-evento.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEventoPageRoutingModule {}
