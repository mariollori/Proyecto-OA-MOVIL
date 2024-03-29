//httpConfig.interceptor.ts
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
  
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
    
    constructor(private token:TokenService,private route:Router,private navctrl:NavController) { }
  
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
      const token = this.token.token;
      

      //Authentication by setting header with token value
      if (token) {
        request = request.clone({
          setHeaders: {
            'authorization': token
          }
        });
      }
  
      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }
  
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
  

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
  
          if (err.status === 401) {
            this.token.logout();
            this.navctrl.navigateForward('login');
          }
  
          return throwError( err );
  
        })
      );
    
  
    }
  }