import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { Persona } from '../models/persona';
import { Usuario } from '../models/usuario';
import OneSignal from 'onesignal-cordova-plugin';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  urlEndpoint = "hhttps://proyectooa-backend.herokuapp.com/EX3/auth";

  constructor(private http: HttpClient) { }
  private _usuario: Usuario;
  private _persona:Paciente;
  private _token :string;

  public get usuario():Usuario{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && localStorage.getItem('usuario')){
      this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
     
       return this._usuario;
    }
    return null;

  }
  public get persona():Paciente{
    if(this._persona!=null){
      return this._persona;
    }else if(this._persona==null && localStorage.getItem('persona')){
      this._persona = JSON.parse(localStorage.getItem('persona')) as Paciente;
       return this._persona;
    }
    return null;

  }
 
 
  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && localStorage.getItem('token')){
      this._token=localStorage.getItem('token')  ;
       return this._token;
    }
    return null;
  }


  login(usuario: Usuario): Observable<any> {
   return this.http.post<any>(this.urlEndpoint + '/login', usuario);
  }

 
  guardarusuario(accestoken:string):void{
    let payload =this.obtenerdatostoken(accestoken);
    let data = payload.usuario;
    this._usuario=new Usuario();
    this._usuario.id = data.idusuario;
    this._usuario.idpersonal = data.idpersonal
    
    
    /**no acepta objetos jason por eso con la stringify lo pasamos a texto */
    localStorage.setItem('usuario',JSON.stringify(this._usuario));

  }
  guardartoken(accestoken:string):void{
    this._token=accestoken;
    localStorage.setItem('token',this._token)
  }

  guardarpersona(data):void{
    this._persona=new Paciente();
  
    this._persona.idpaciente= data.idpaciente;
    this._persona.idpersona= data.idpersona;
    localStorage.setItem('persona',JSON.stringify(this._persona))
  }

  obtenerdatostoken(accestoken:string):any{
    if(accestoken!=null){
      return JSON.parse(atob(accestoken.split(".")[1]));
    }
    return null;
  }
  isAuthenticated():boolean{
    let payload=this.obtenerdatostoken(this.token)
    
    if(payload != null && payload.usuario ){
      return true;

    }
    
    return false;
  }
  logout():void{
    
    this._usuario=null;
    this._token=null;
    this._persona=null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('persona');
    
    
    OneSignal.removeExternalUserId()
  }
}
