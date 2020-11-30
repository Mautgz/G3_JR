import { NgModule } from '@angular/core';
// Modelos
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from '../app-routing.module';

import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    ClientesComponent,
    ProductosComponent,
    VentasComponent,
    PagesComponent
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

    // *===== Modulos propios ==========*
    SharedModule,

    //funcionar el routeoutlet
    AppRoutingModule
  ]
})
export class PagesModule { }
