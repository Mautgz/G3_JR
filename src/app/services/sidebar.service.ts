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
        {titulo:'Clientes', url: ''},
        {titulo:'Productos', url: 'product'},
        {titulo: 'Ventas', url:'sells'}

      ]
    }

  ];

  constructor() { }
}
