import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  configuracioninicial() {
    
    this.oneSignal.startInit('0f4599ff-8cbe-4d06-a525-f637d5c40dc0', '918346048998');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      console.log('Notificacion recibida',noti)
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      console.log('Notificacion abierta',noti)
    });

    this.oneSignal.endInit();
  }
}
