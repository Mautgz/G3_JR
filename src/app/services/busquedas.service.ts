import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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
  private transformarUsuarios(resultados: any[]): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email
        ,user.direccion, user.telefono, user.role, user.uid, '')
    );
  }
  private transformarProductos(resultados: any[]): Producto[]{
    return resultados;
  }
  
  
  buscar( tipo: 'usuarios' | 'productos' | 'ventas', 
          termino: string = ''){
    const url = `${ base_url }/todo/coleccion/${ tipo }/${termino}`;
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map((resp:any )=> {
                switch (tipo) {
                  case 'usuarios':
                    return this.transformarUsuarios(resp.resultados);
                    
                    case 'productos':
                    return this.transformarProductos(resp.resultados);
                    
                
                  default:
                    return [];
                }
              } )
            );
  }
}
