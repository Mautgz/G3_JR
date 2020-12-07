import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Venta } from '../models/venta.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor( private http: HttpClient) { }
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
  cargarVentas(){
    const url = `${ base_url }/ventas`;
    return this.http.get(url, this.headers)
            .pipe(
              map(
                (resp: {ok: boolean, ventas: Venta[]}) => resp.ventas
              )
            );
  }
  crearVenta( usuario: string, producto: string, total: number){
    const url = `${ base_url }/ventas`;
    return this.http.post(url, { usuario, producto, total } , this.headers);
  }
  actualizarVenta(venta: Venta){
    const url = `${ base_url }/ventas/${ venta.uid }`;
    return this.http.put(url, venta, this.headers);
  }
  borrarVenta(uid: string){
    const url = `${ base_url }/ventas/${ uid }`;
    return this.http.delete(url, this.headers);
  }
}
