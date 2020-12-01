import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo:'Cliente', url: ''},
        {titulo:'Producto', url: 'product'},
        {titulo: 'Venta', url:'sells'}

      ]
    }

  ];

  constructor() { }
}
