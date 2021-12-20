import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recurso } from '../models/recurso';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})

export class RecursoService {

  baseUrl:string = '';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService) {
    this.baseUrl = environment.baseUrl + 'Recursos';
   }

  getRecurso(){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.get<Recurso[]>(this.baseUrl, options);
  }
  createRecurso(recurso: Recurso){
    const options = 
    { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.post<Recurso[]>(`${this.baseUrl}/NuevoRecurso`,recurso, options);
  }

  updateRecurso(recurso: Recurso){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.put<Recurso[]>(`${this.baseUrl}/ModificarRecurso/${recurso.idRecurso}`, recurso, options);
  }

  delete(idRecurso: number){
    const options = 
     { headers: new HttpHeaders().set('token', this.jwtService.getJwt()) }
    return this.http.delete(`${this.baseUrl}/EliminarRecurso/${idRecurso}`,{...options, responseType:"text"});
  }
}

