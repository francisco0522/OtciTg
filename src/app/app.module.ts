import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NovedadesPage } from '../pages/novedades/novedades';
import { ContactoPage } from '../pages/contacto/contacto';
import { EjecutadosProyectosPage } from '../pages/ejecutados-proyectos/ejecutados-proyectos';
import { EntidadesPage } from '../pages/entidades/entidades';
import { EventosPage } from '../pages/eventos/eventos';
import { IniciativaProyectosPage } from '../pages/iniciativa-proyectos/iniciativa-proyectos';

import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { HttpClient } from '../providers/wp/http-client';
import { WpProvider } from '../providers/wp/wp';
import { Base64 } from '@ionic-native/base64';
import { Login } from '../pages/login/login';
import { Report } from '../pages/report/report';
import { IonicStorageModule } from '@ionic/storage';

import { 
  WpApiModule,
  WpApiLoader,
  WpApiStaticLoader
} from 'wp-api-angular'

export function WpApiLoaderFactory(http) {
  return new WpApiStaticLoader(http, 'http://otcicali.uao.edu.co/index.php/wp-json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactoPage,
    EjecutadosProyectosPage,
    EntidadesPage,
    EventosPage,
    IniciativaProyectosPage,
    NovedadesPage,
    Login,
    Report
  ],
  imports: [
    BrowserModule,
    HttpModule,
        WpApiModule.forRoot({
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactoPage,
    EjecutadosProyectosPage,
    EntidadesPage,
    EventosPage,
    IniciativaProyectosPage,
    NovedadesPage,
    Login,
    Report
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WpProvider
  ]
})
export class AppModule {}
