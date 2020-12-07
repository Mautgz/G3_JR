import { NgModule } from '@angular/core';
// Modelos
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from '../app-routing.module';

import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VentaComponent } from './ventas/venta.component';



@NgModule({
  declarations: [
    ClientesComponent,
    ProductosComponent,
    VentasComponent,
    PagesComponent,
    PerfilComponent,
    VentaComponent
  ],
  exports: [
    ClientesComponent,
    ProductosComponent,
    VentasComponent,
    PagesComponent
  ],
  imports: [
    // *===== Modulos de terceros ==========*
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // *===== Modulos propios ==========*
    SharedModule,

    //funcionar el routeoutlet
    AppRoutingModule
  ]
})
export class PagesModule { }
