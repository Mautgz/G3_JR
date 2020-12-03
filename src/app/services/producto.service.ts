import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  

  constructor( public http: HttpClient) { }

 
  get token (): string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  cargarProductos(){
    const url = `${ base_url }/productos`;
    return this.http.get(url, this.headers)
            .pipe(
              map(
                (resp: {ok: boolean, productos: Producto[]}) => resp.productos
              )
            );
  }
  crearProducto( nombre: string, precio: number, stock: number){
    const url = `${ base_url }/productos`;
    return this.http.post(url, {nombre, precio, stock}, this.headers);
  }
  actualizarProducto(uid: string, nombre: string, precio: number, stock: number){
    const url = `${ base_url }/productos/${ uid }`;
    return this.http.put(url, {nombre, precio, stock}, this.headers);
  }
  borrarProducto(uid: string){
    const url = `${ base_url }/productos/${ uid }`;
    return this.http.delete(url, this.headers);
  }
}
