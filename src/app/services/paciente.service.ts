import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { Persona } from '../models/persona';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient) { }

  
  urlEndpoint = "http://localhost:5050/EX3/persona";
  urlEndpoint2 = "http://localhost:5050/EX3/usuario";
  crearpaciente(persona:Persona,paciente:Paciente):Observable<String>{
    console.log(persona)
    console.log(paciente)
  
    return this.http.post<String>(this.urlEndpoint + '/postpaciente',{persona,paciente});
  }
  getuser(idusuario):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint2 + '/' + idusuario);
  }
}
