import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageModule } from './pages/login/login.module';

import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            FormsModule,
            ReactiveFormsModule,
            LoginPageModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule
          ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
