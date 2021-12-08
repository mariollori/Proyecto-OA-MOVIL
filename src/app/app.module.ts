import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistropacComponent } from './registerpac/registropac/registropac.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { HttpConfigInterceptor } from './interceptorHTTP/token_interceptor.interceptor';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
@NgModule({
  declarations: [AppComponent, RegistropacComponent,LoginComponent],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    CommonModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
       BrowserAnimationsModule,
       MatStepperModule,
       ReactiveFormsModule,
       MatExpansionModule,
       AngularFireModule.initializeApp(environment.firebase),
       AngularFireStorageModule,
      ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
