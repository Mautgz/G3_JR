import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo:'Cliente', url: ''},
        {titulo:'Producto', url: 'product'},
        {titulo: 'Venta', url:'sells'}

      ]
    }
  ];

  constructor() { }
}
