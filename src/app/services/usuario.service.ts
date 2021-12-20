import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  baseUrl:string = '';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService) {
    this.baseUrl = environment.baseUrl + 'Usuarios';
   }

  getUsuario(){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.get<Usuario[]>(this.baseUrl, options);
  }

  createUsuario(Usuario: Usuario){
    const options = 
    { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.post<Usuario[]>(`${this.baseUrl}/NuevoUsuario`, Usuario, options);
  }

  updateUsuario(usuario: Usuario){
    const options = 
    { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.put<Usuario[]>(`${this.baseUrl}/ModificarUsuario/${usuario.idUsuario}`, usuario, options);
  }

  
  delete(idUsuario: number){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt())}
    return this.http.delete(`${this.baseUrl}/EliminarUsuario/${idUsuario}`,{...options, responseType:"text"});
    
  }
  }

