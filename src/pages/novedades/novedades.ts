import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider, Post } from '../../providers/wp/wp';
import { Observable } from 'rxjs/Observable';

import { WpApiPosts, WpApiMedia, WpApiUsers } from 'wp-api-angular';


@Component({
  selector: 'page-novedades',
  templateUrl: 'novedades.html',
})
export class NovedadesPage {

  loader: Loading;
  posts: Observable<Post[]>;
 
  constructor(public navCtrl: NavController, public WpProvider: WpProvider, public loadingCtrl: LoadingController) {
    this.presentLoading();
    this.posts = this.WpProvider.getPostsNovedades();
    this.posts.subscribe(data => 
        this.loader.dismiss())    }
 
  getUserImage(id: number) {
    return this.WpProvider.getUserImage(id);
  }
 
  getUserName(id: number) {
    return this.WpProvider.getUserName(id);
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

}
