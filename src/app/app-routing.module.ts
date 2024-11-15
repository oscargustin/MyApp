import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./pages/recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'codigo-qr',
    loadChildren: () => import('./pages/codigo-qr/codigo-qr.module').then( m => m.CodigoQRPageModule)
  },
  {
    path: 'inicio-alumno',
    loadChildren: () => import('./pages/inicio-alumno/inicio-alumno.module').then( m => m.InicioAlumnoPageModule)
  },
  {
    path: 'registrar-asistencia',
    loadChildren: () => import('./pages/registrar-asistencia/registrar-asistencia.module').then( m => m.RegistrarAsistenciaPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'log-out',
    loadChildren: () => import('./pages/log-out/log-out.module').then( m => m.LogOutPageModule)
  },
  {
    path: 'perfil-popover',
    loadChildren: () => import('./pages/perfil-popover/perfil-popover.module').then( m => m.PerfilPopoverPageModule)
  },
  {
    path: 'inicio-profe',
    loadChildren: () => import('./pages/inicio-profe/inicio-profe.module').then( m => m.InicioProfePageModule)
  },
  {
    path: 'generar-qrprofe',
    loadChildren: () => import('./pages/generar-qrprofe/generar-qrprofe.module').then( m => m.GenerarQrprofePageModule)
  },  {
    path: 'asignaturasprofe',
    loadChildren: () => import('./pages/asignaturasprofe/asignaturasprofe.module').then( m => m.AsignaturasprofePageModule)
  },




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
