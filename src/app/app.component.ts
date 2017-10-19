import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactoPage } from '../pages/contacto/contacto';
import { EjecutadosProyectosPage } from '../pages/ejecutados-proyectos/ejecutados-proyectos';
import { EntidadesPage } from '../pages/entidades/entidades';
import { EventosPage } from '../pages/eventos/eventos';
import { IniciativaProyectosPage } from '../pages/iniciativa-proyectos/iniciativa-proyectos';
import { NovedadesPage } from '../pages/novedades/novedades';
import { Login } from '../pages/login/login';
import { Report } from '../pages/report/report';
import { UserProvider } from '../providers/wp/user-provider';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html',
  providers: [UserProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private events: Events,
    private userData: UserProvider, private user: UserProvider) {
   // this.initializeApp();
    this.listenToLoginEvents();
    userData.checkedLoggedInStatus();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Novedades', component: NovedadesPage }, 
      { title: 'Proyectos Ejecutados', component: EjecutadosProyectosPage },
      { title: 'Iniciativa de Proyectos', component: IniciativaProyectosPage },
      { title: 'Eventos', component: EventosPage },
      { title: 'Entidades', component: EntidadesPage },
      { title: 'Contactos', component: ContactoPage },
      { title: 'Crear Entrada', component: Report }

      
      
      
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  listenToLoginEvents() {
    // if the user is logged in then navigate to the Homepage page
    this.events.subscribe('user:login', () => this.rootPage = HomePage);
    this.events.subscribe('user:logout', () => this.rootPage = Login);
  }
 


  logout() {
    this.user.logout();
  }
}

