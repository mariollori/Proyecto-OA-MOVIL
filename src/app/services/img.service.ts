import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImgService {
  nombre:string;
  constructor(private firebas:AngularFireStorage,private http:HttpClient ) { 
    this.nombre=localStorage.getItem('imagen')
  }
  urlEndpoint = 'https://proyectooa-backend.herokuapp.com/EX3/datos_psicologo'
  async subirImagen(imagen : File) {

    try {
      let respuesta = await this.firebas.upload("img/" + imagen.name,imagen);
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }

  }
  mostrarimagenfirebase(nombre:string):Observable<string>{
  
    const ref = this.firebas.ref(`img/${nombre}`);
    console.log(nombre)
    return ref.getDownloadURL();
  }
  subirfoto(id,foto):Observable<any>{
    return this.http.put<any>(this.urlEndpoint + '/update/foto',{id,foto});

  }
}
