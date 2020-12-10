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
  public role: string = localStorage.getItem('role');

  constructor( private productoService: ProductoService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarProducto();
    console.log(this.role);
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
    this.productoService.actualizarProducto(producto.uid, producto.nombre, producto.precio, Math.trunc(producto.stock))
        .subscribe(resp => {
          this.cargarProducto();
          Swal.fire('Actualizado', producto.nombre, 'success');
        });
  }
  eliminarProducto(producto: Producto){
    Swal.fire({
      title: '¿Borrar producto?',
      text: `Esta a punto de borrar el producto ${ producto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.productoService.borrarProducto(producto.uid)
        .subscribe(resp=> {
          this.cargarProducto();
          Swal.fire(
            'Venta borrada',
            `${ producto.nombre } fue eliminado correctamente`,
            'success'
          );
        });
              
      }
    })
    // this.productoService.borrarProducto(producto.uid)
    //     .subscribe(resp => {
    //       this.cargarProducto();
    //       Swal.fire('Borrado', producto.nombre, 'success');

    //     });
    
  }
    async abrirSweetAlert(){
    const { value: formValues } = await Swal.fire<any>({
      title: 'Crear producto',
      icon:'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      html:
        'Nombre del producto: <input id="nombre" class="swal2-input" placeholder="Ingrese nombre del producto">' +
        'Precio: <input id="precio" class="swal2-input" placeholder="Ingrese el precio actual">'+
        'Stock: <input id="stock" class="swal2-input" placeholder="Ingrese el stock (sumarizado)">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('nombre')).value,
          (<HTMLInputElement>document.getElementById('precio')).value,
          (<HTMLInputElement>document.getElementById('stock')).value
        ]
      }
    })

    if (formValues) {
      this.productoService.crearProducto(formValues[0], formValues[1],Math.trunc(formValues[2]))
          .subscribe((resp: any) => {
            this.productos.push(resp.producto);
            Swal.fire('Creado', resp.producto.nombre, 'success');
            this.cargarProducto();
          });
    }
  }


}
