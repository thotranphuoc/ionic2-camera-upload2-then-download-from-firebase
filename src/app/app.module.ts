import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';

const firebaseConfig = {
  
    apiKey: "AIzaSyAf1-QYPFKYvSP4zsgd1rAPgGv_vsEWCzE",
    authDomain: "auth-38cb7.firebaseapp.com",
    databaseURL: "https://auth-38cb7.firebaseio.com",
    storageBucket: "auth-38cb7.appspot.com",
    messagingSenderId: "304243304728"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
