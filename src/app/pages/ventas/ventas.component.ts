
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Venta } from 'src/app/models/venta.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public cargando: boolean = true;
  public ventas: Venta[] = [];
  public productos: Producto[] = [];
  public role: string = localStorage.getItem('role');


  constructor( private ventaService: VentaService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarVentas();
  }
  buscar(termino: string){
    if(termino.length === 0){
      return this.cargarVentas(); 
    }
    this.busquedasService.buscar ('productos', termino)
        .subscribe( resp => {
          console.log(resp);
          this.productos = resp;
        });
  }
  cargarVentas(){

    this.cargando = true;
    this.ventaService.cargarVentas()
      .subscribe( ventas => {
        this.cargando = false;
        this.ventas = ventas;
      });


  }
  borrarVenta(venta: Venta){
    Swal.fire({
      title: '¿Borrar venta?',
      text: `Esta a punto de borrar la venta del producto  ${venta.producto.nombre} del cliente ${venta.usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.ventaService.borrarVenta(venta.uid)
        .subscribe(resp=> {
          this.cargarVentas();
          Swal.fire(
            'Venta borrada',
            `La venta del cliente ${ venta.usuario.nombre } fue eliminado correctamente`,
            'success'
          
          
          );
        });
              
      }
    })
  }

}
