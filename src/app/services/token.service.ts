import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  urlEndpoint = "http://localhost:5050/EX3/auth";

  constructor(private http: HttpClient) { }
  private _usuario: Usuario;
  
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
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    
    
  
  }
}
