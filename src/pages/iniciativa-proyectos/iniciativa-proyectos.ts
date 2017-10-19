import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider, Post } from '../../providers/wp/wp';
import { Observable } from 'rxjs/Observable';
import { WpApiPosts, WpApiMedia, WpApiUsers } from 'wp-api-angular';
/**
 * Generated class for the IniciativaProyectosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-iniciativa-proyectos',
  templateUrl: 'iniciativa-proyectos.html',
})
export class IniciativaProyectosPage {
  loader: Loading;
  posts: Observable<Post[]>;
 
  constructor(public navCtrl: NavController, public wpProvider: WpProvider, public loadingCtrl: LoadingController) {
    this.presentLoading();
    this.posts = this.wpProvider.getPostsIniciativaProyectos();
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

}