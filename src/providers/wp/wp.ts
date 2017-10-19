import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { WpApiPosts, WpApiMedia, WpApiUsers } from 'wp-api-angular';
import {Http} from '@angular/http';
 
export class Post {
  public media_url: Observable<string>;
  constructor(public authorId: number, public id: number, public title: string, public content: string, public excerpt: string, public date: string, public mediaId?: number ) { }
}


export class User {
  constructor(public id: number, public name: string, public userImageUrl: string) { }
}
 
@Injectable()
export class WpProvider {
  urlProyectosEjecutados: string = 'http://otcicali.uao.edu.co/index.php/wp-json/wp/v2/posts/?categories=68';
  urlNovedades: string = 'http://otcicali.uao.edu.co/index.php/wp-json/wp/v2/posts/?categories=69';
  urlIniciativaProyectos: string = 'http://otcicali.uao.edu.co/index.php/wp-json/wp/v2/posts/?categories=67';
  urlTodo: string = 'http://otcicali.uao.edu.co/index.php/wp-json/wp/v2/posts/?categories=69+66';
  users: User[];
 
  constructor(private http: Http,public wpApiPosts: WpApiPosts, public wpApiMedia: WpApiMedia, public wpApiUsers: WpApiUsers) {
    this.wpApiUsers.getList()
      .map(res => res.json())
      .subscribe(data => {
        this.users = [];
        for (let user of data) {
          let oneUser = new User(user[ 'id' ], user[ 'name' ], user[ 'avatar_urls' ][ '96' ]);
          this.users.push(oneUser);
        }
      })
      
  }
 


  getPosts(): Observable<Post[]> {
    return this.http.get( this.urlTodo )
      .map(res => res.json())
      
      .map(data => {
        var posts = [];
        for (let post of data ) {
          let onePost = new Post(
            post[ 'author' ], 
            post[ 'id' ], 
            post[ 'title' ][ 'rendered' ], 
            post[ 'content' ][ 'rendered' ], 
            post[ 'excerpt' ][ 'rendered' ], 
            post[ 'date' ], 
            post[ 'featured_media' ]);
          onePost.media_url = this.getMedia(onePost.mediaId);
          posts.push(onePost);
        }
        return posts;
      });
  }

  getPostsProyectosEjecutados(): Observable<Post[]> {
    return this.http.get( this.urlProyectosEjecutados )
      .map(res => res.json())
      .map(data => {
        var posts = [];
        for (let post of data ) {
          let onePost = new Post(
            post[ 'author' ], 
            post[ 'id' ], 
            post[ 'title' ][ 'rendered' ], 
            post[ 'content' ][ 'rendered' ], 
            post[ 'excerpt' ][ 'rendered' ], 
            post[ 'date' ], 
            post[ 'featured_media' ]);
          onePost.media_url = this.getMedia(onePost.mediaId);
          posts.push(onePost);
        }
        return posts;
      });
  }

  getPostsNovedades(): Observable<Post[]> {
    return this.http.get( this.urlNovedades )
      .map(res => res.json())
      .map(data => {
        var posts = [];
        for (let post of data ) {
          let onePost = new Post(
            post[ 'author' ], 
            post[ 'id' ], 
            post[ 'title' ][ 'rendered' ], 
            post[ 'content' ][ 'rendered' ], 
            post[ 'excerpt' ][ 'rendered' ], 
            post[ 'date' ], 
            post[ 'featured_media' ]);
          onePost.media_url = this.getMedia(onePost.mediaId);
          posts.push(onePost);
        }
        return posts;
      });
  }

  getPostsIniciativaProyectos(): Observable<Post[]> {
    return this.http.get( this.urlIniciativaProyectos )
      .map(res => res.json())
      .map(data => {
        var posts = [];
        for (let post of data ) {
          let onePost = new Post(
            post[ 'author' ], 
            post[ 'id' ], 
            post[ 'title' ][ 'rendered' ], 
            post[ 'content' ][ 'rendered' ], 
            post[ 'excerpt' ][ 'rendered' ], 
            post[ 'date' ], 
            post[ 'featured_media' ]);
          onePost.media_url = this.getMedia(onePost.mediaId);
          posts.push(onePost);
        }
        return posts;
      });
  }
 
  getMedia(id: number): Observable<string> {
    return this.wpApiMedia.get(id)
      .map(res => res.json())
      .map(data => {
        return data[ 'source_url' ];
      });
  }
 
  getUserImage(userId: number) {
    for (let usr of this.users) {
      if (usr.id === userId) {
        return usr.userImageUrl;
      }
    }
  }
 
  getUserName(userId: number) {
    for (let usr of this.users) {
      if (usr.id === userId) {
        return usr.name;
      }
    }
  }
}