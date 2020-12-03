import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos: Producto[] = [];
  public cargando: boolean = true;

  constructor( private productoService: ProductoService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarProducto();
  }
  // Buscar clientes
  buscar (termino: string){
    if(termino.length === 0){
      return this.cargarProducto(); 
    }
    this.busquedasService.buscar ('productos', termino)
        .subscribe( resultados => {
          this.productos = resultados;

        });
  }
  cargarProducto(){
    this.cargando = true;
    this.productoService.cargarProductos()
          .subscribe(
            productos => {
              this.cargando = false;
              this.productos = productos;
            }
          )
  }
  guardarCambios(producto: Producto){
    this.productoService.actualizarProducto(producto.uid, producto.nombre, producto.precio, producto.stock)
        .subscribe(resp => {
          Swal.fire('Actualizado', producto.nombre, 'success');
        });
  }
  eliminarProducto(producto: Producto){
    this.productoService.borrarProducto(producto.uid)
        .subscribe(resp => {
          this.cargarProducto();
          Swal.fire('Borrado', producto.nombre, 'success');
        });
  }
    async abrirSweetAlert(){
    const { value: formValues } = await Swal.fire<any>({
      title: 'Crear producto',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Ingrese nombre del producto">' +
        '<input id="precio" class="swal2-input" placeholder="Ingrese el precio actual">'+
        '<input id="stock" class="swal2-input" placeholder="Ingrese el stock (sumarizado)">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('nombre')).value,
          (<HTMLInputElement>document.getElementById('precio')).value,
          (<HTMLInputElement>document.getElementById('stock')).value
        ]
      }
    })

    if (formValues) {
      this.productoService.crearProducto(formValues[0], formValues[1], formValues[2])
          .subscribe((resp: any) => {
            this.productos.push(resp.producto);
            Swal.fire('Creado', resp.producto.nombre, 'success');
            this.cargarProducto();
          });
    }
  }


}
