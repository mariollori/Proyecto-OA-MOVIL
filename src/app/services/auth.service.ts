import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlEndpoint = "http://localhost:5050/EX3/auth";
  constructor(private http:HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndpoint + '/login', usuario);
   }
}
