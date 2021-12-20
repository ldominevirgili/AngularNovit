import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOb3ZpdE5ldENvcmUiLCJuYW1lIjoibm92aXQiLCJleHAiOjE2NzI1NDIwMDB9.C8g9talBrmrnAyGNczyhjCSr0IYIhbIDvpWVm3TU9RM'
  
  constructor() { 
    this.token = environment.token;
  }

  getJwt():string{
    return this.token;
  }
}
