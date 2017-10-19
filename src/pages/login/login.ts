import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/wp/user-provider';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;
  constructor(public UserProvider: UserProvider,public navCtrl: NavController) {
  }
  login() {
    this.UserProvider.login(this.username, this.password);
  }

  Entrar(){
    this.navCtrl.setRoot(HomePage);
  }
}
