import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider, Post } from '../../providers/wp/wp';
import { Observable } from 'rxjs/Observable';

import { WpApiPosts, WpApiMedia, WpApiUsers } from 'wp-api-angular';

/**
 * Generated class for the EjecutadosProyectosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ejecutados-proyectos',
  templateUrl: 'ejecutados-proyectos.html',
})
export class EjecutadosProyectosPage {

  loader: Loading;
  posts: Observable<Post[]>;
 
  constructor(public navCtrl: NavController, public WpProvider: WpProvider, public loadingCtrl: LoadingController) {
    this.presentLoading();
    this.posts = this.WpProvider.getPostsProyectosEjecutados();
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
