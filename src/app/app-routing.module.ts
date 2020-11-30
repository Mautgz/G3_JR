import { NgModule } from '@angular/core';
//Modulos
import {RouterModule, Router, Routes} from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

const routes:Routes= [

  //ruta por defecto
  {path: '', redirectTo: '/gestion', pathMatch: 'full'},
  //pagina no encontrada
  // {path: '**', component: NopagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    //rutas hija
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
