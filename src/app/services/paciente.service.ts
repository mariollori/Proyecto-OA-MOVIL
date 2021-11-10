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
  urlEndpoint3 = "http://localhost:5050/EX3/paciente";
  crearpaciente(persona:Persona,paciente:Paciente):Observable<String>{
    console.log(persona)
    console.log(paciente)
  
    return this.http.post<String>(this.urlEndpoint + '/postpaciente',{persona,paciente});
  }
  getuser(idusuario):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint2 + '/' + idusuario);
  }
  
  getlistpac(idpersonal):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/listarpacasig/' + idpersonal);
  }

  getnroregistros(idasignacion):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/numeroregistros/' + idasignacion);
  }

  getidsesion(idasignacion):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/getidatencion/' + idasignacion);
  }
  registrardata1(paciente, atencion, id,fecha):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata1' ,{paciente,atencion,id,fecha});
  }

  registrardata2(atencion, id,fecha):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata2' ,{atencion,id,fecha});
  }
  registrardata3(atencion, id,derivacion):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata3' ,{atencion,id,derivacion});
  }
  getatencion_pend(idpersonal):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/listatencion_pend/' + idpersonal);
  }
 
}
