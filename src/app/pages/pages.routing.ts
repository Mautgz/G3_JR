import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [

  {
    path: 'gestion',
    component: PagesComponent,
    canActivate:[AuthGuard],
    //rutas hijas
    children:[
      {path: '', component: ClientesComponent, data: {titulo: 'Cliente'}},
      {path: 'product', component: ProductosComponent, data: {titulo: 'Producto'}},
      {path: 'sells', component: VentasComponent, data: {titulo: 'Venta'}},
      {path: 'profile', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
