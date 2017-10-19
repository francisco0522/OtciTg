import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider, Post } from '../../providers/wp/wp';
import { Observable } from 'rxjs/Observable';
import { Login } from '../login/login';
import { UserProvider } from '../../providers/wp/user-provider';
import { WpApiPosts, WpApiMedia, WpApiUsers } from 'wp-api-angular';

import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: Loading;
  posts: Observable<Post[]>;
 
  constructor(public navCtrl: NavController, public wpProvider: WpProvider, public loadingCtrl: LoadingController, private user: UserProvider,public events: Events) {
    
    var status = "on";
    this.presentLoading();
    this.posts = this.wpProvider.getPosts();
    this.posts.subscribe(data => 
        this.loader.dismiss())    }
 
  getUserImage(id: number) {
    return this.wpProvider.getUserImage(id);
  }
 
  getUserName(id: number) {
    return this.wpProvider.getUserName(id);
  }
 
  openPost(post: Post) {
    this.navCtrl.push('PostPage', {post: post});
  }
 
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  Ingresar(){
    this.user.logout();
  }

  listenToLoginEvents() {
    
    // if the user is logged in then navigate to the Homepage page
    this.events.subscribe('user:login', () => status="logIn");
    this.events.subscribe('user:logout', () => status="logOut" );
  }

}
