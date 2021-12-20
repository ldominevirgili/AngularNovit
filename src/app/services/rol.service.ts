import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from "../models/rol";
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})

export class RolService {
  getUsuario() {
    throw new Error('Method not implemented.');
  }

  baseUrl:string = '';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService) {
    this.baseUrl = environment.baseUrl + 'Roles';
   }

  getRol(){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.get<Rol[]>(this.baseUrl, options);
  }
  createRol(Rol: Rol){
    const options = 
    { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.post<Rol[]>(`${this.baseUrl}/NuevoRol`, Rol, options);
  }


  updateRol(rol: Rol){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.put<Rol[]>(`${this.baseUrl}/ModificarRol/${rol.idRol}`, rol, options);
  }

  deleteRol(idRol: number){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.delete(`${this.baseUrl}/Eliminar/${idRol}`,{...options, responseType:"text"});
  }
}
