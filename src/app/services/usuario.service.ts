import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Modelo parametrado mediante Singleton
  public usuario: Usuario;
  constructor( private http: HttpClient,
              private router: Router ) { }

  get token (): string{
    return localStorage.getItem('token') || '';
  }
  get uid(): string{
    return this.usuario.uid || '';
  }
  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  // funcion para proteger rutas si es que no esta logeado
  validarToken(): Observable<boolean>{

   return this.http.get(`${base_url }/login/renew`,{
      headers: {
        'x-token': this.token
      }
    }).pipe (
      map ( (resp:any) => {
        const {nombre ,email,direccion,telefono,role ,uid} = resp.usuario;

        this.usuario = new Usuario( nombre, email, direccion, telefono, role, uid);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('role', this.usuario.role);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario (formData: RegisterForm){

    return this.http.post(`${ base_url }/usuarios`, formData)
              .pipe (
                tap ( (resp: any) =>{
                  localStorage.setItem('token', resp.token);
                })
              );


  }
  actualizarPerfil( data: { email: string, nombre: string, role: string}){
      data = {
        ...data,
        role: this.usuario.role
      };
      
      return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data,this.headers);
  }
  login (formData: LoginForm){

    return this.http.post(`${ base_url }/login`, formData)
              .pipe (
                tap ( (resp: any) =>{
                  localStorage.setItem('token', resp.token);
                })
              );

  }

  cargarUsuarios( desde: number = 0){
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>(url, this.headers)
                .pipe(
                  delay(100),
                  map( resp => {
                    console.log(resp.usuarios);
                    const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, user.email
                      ,user.direccion, user.numero_telefonico, user.role, user.uid, ''));
                    return {
                      total: resp.total,
                      usuarios
                    }
                  })
                );
  }
  eliminarUsuario(usuario: Usuario){
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete(url, this.headers)
  }
  guardarUsuario(usuario: Usuario){
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario,this.headers);

  }
}
