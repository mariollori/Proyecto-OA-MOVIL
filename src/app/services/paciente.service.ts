import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cancelacion } from '../models/cancelacion';
import { Paciente } from '../models/paciente';
import { Persona } from '../models/persona';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient) { }

  
  urlEndpoint = "https://proyectooa-backend.herokuapp.com/EX3/persona";
  urlEndpoint2 = "https://proyectooa-backend.herokuapp.com/EX3/usuario";
  urlEndpoint3 = "https://proyectooa-backend.herokuapp.com/EX3/paciente";
  urlEndpoint4 = "https://proyectooa-backend.herokuapp.com/EX3/datos_psicologo";
  
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
  registrardata1(paciente, atencion, id,fecha,hora):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata1' ,{paciente,atencion,id,fecha,hora});
  }

  registrardata2(atencion, id,fecha,hora):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata2' ,{atencion,id,fecha,hora});
  }
  registrardata3(atencion, id,derivacion):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata3' ,{atencion,id,derivacion});
  }
  getatencion_pend(idpersonal):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/listatencion_pend/' + idpersonal);
  }

   crearcancelacion(cancelacion:Cancelacion,idpaciente):Observable<any>{
    return this.http.post<any>(this.urlEndpoint2 + '/crearcancelacion/post', { cancelacion,idpaciente})
   }
   


   changedataper(persona):Observable<any>{
     return this.http.put<any>(this.urlEndpoint2 + '/putdataper',{persona});

   }
   changedatasch(personal_ayuda,tipo):Observable<any>{
    return this.http.put<any>(this.urlEndpoint4 + '/update/dataschool',{personal_ayuda,tipo});

  }


  updatefecha(fecha,id,hora):Observable<any>{
    return this.http.put<any>(this.urlEndpoint3 + '/updatefecha',{fecha,id,hora});

  }


  loginpac(nro_cita,dni):Observable<any>{
    return this.http.post<any>(this.urlEndpoint2 + '/loginpac',{nro_cita,dni});

  }

  getdatasignacion(idpaciente):Observable<any>{
    return this.http.get<any>(this.urlEndpoint2 + '/dataasig/'+ idpaciente)
  }
  getdataperson(idpersona):Observable<any>{
    return this.http.get<any>(this.urlEndpoint2 + '/persondata/'+ idpersona)
  }
  getpuntajeexist(idpaciente):Observable<any>{
    return this.http.get<any>(this.urlEndpoint2 + '/puntajeexist/'+ idpaciente)
  }
  
  crearvaloracion(idpaciente,idpersonal,puntaje):Observable<any>{
    return this.http.post<any>(this.urlEndpoint2 + '/registrar/puntaje',{idpaciente,idpersonal,puntaje})
  }
}
