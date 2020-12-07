
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';


import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Venta } from 'src/app/models/venta.model';



import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styles: []
})
export class VentaComponent implements OnInit {

  public total: number = 1;
  public precio: number = 0;
  public ventaForm: FormGroup;
  public productos: Producto[]=[];
  public usuarios: Usuario[]=[];
  public productoSeleccionado: Producto;
  public ventaSeleccionada: Venta;

  constructor(private fb: FormBuilder,
              private ventaService: VentaService,
              private productoService: ProductoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit( ): void {

    this.activatedRoute.params.subscribe(
      ({ id }) => {
        this.cargarVenta( id );
      }
    )
    // this.ventaService.obtenerVentaPorId()

    this.ventaForm  =this.fb.group({
      usuario: ['', Validators.required],
      producto:['', Validators.required]
    })
    this.cargarProductos();
    this.cargarClientes();
    this.ventaForm.get('producto').valueChanges
        .subscribe( productoId =>{
          this.productoSeleccionado = this.productos.find(p =>{return p.uid === productoId });
      });

    
  }
  cargarVenta(id: string){
    if(id == 'nuevo'){
      return;
    }
    this.ventaService.obtenerVentaPorId( id )
        .pipe(
          delay(100)
        )
        .subscribe( venta => {
          if( !venta){
            return this.router.navigateByUrl(`/gestion/sells`);
          }
          console.log(venta);
          var usuario = venta.usuario._id;
          var producto = venta.producto._id;
          var total = venta.total;
          this.ventaSeleccionada = venta;
          this.total = total;
          this.ventaForm.setValue({usuario, producto});

        })
  }
  cargarProductos(){
    this.productoService.cargarProductos()
      .subscribe( (productos: Producto[])=>{
          this.productos = productos;
      })
  }
  cargarClientes(){
    this.usuarioService.cargarUsuarios()
      .subscribe( ({usuarios}) => {
        
        this.usuarios = usuarios;
      });
  }
  calcularTotal(precio: number, cantidad: number){
    this.precio = precio;
    if(cantidad <= 0 || isNaN(cantidad)){
      this.total = 0;
    }
    this.total = this.precio * cantidad;
  }
  guardarVenta(){
    if(this.ventaSeleccionada){
      // actualizar
      const data = {
        ...this.ventaForm.value,
        uid: this.ventaSeleccionada.uid,
        total: this.total
      }
      this.ventaService.actualizarVenta(data)
          .subscribe (resp => {
            Swal.fire('Actualizado', ' Venta actualizada correctamente', 'success' );
          })
    }else{
      //crear
      this.ventaService.crearVenta( this.ventaForm.controls['usuario'].value,this.ventaForm.controls['producto'].value, this.total)
          .subscribe( (resp: any) => {
            if( this.total <= 0 ){
              Swal.fire('Validación', ' el total de la venta no tiene que ser menor o igual a cero.', 'warning' );
            }else{
              Swal.fire('Creado', ' Venta creada correctamente', 'success' );
              this.router.navigateByUrl(`/gestion/sell/${ resp.venta.uid}`);
            }
            
          });
    }
  }
  

}
