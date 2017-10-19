import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient } from '../wp/http-client';
import { Storage } from '@ionic/storage';

@Injectable()
export class WordPressProvider {
  constructor(private events: Events, private http: HttpClient, private stor: Storage) {
  }

  AUTHTOKEN: string = "myauthtokenkey";
  createReport(score: string, report: string) {
    
    // let the app know we have started a save operation
    // to show spinners etc
    this.events.publish('wordpress:savestatus', { state: 'saving' });
    // set the JSON data for the call
    // see https://developer.wordpress.org/rest-api/reference/posts/#create-a-post for options
    let data = {
      title: score,
      excerpt: report,
      content: report,
      status: 'pending'
    };
    // the important bit, make a request to the server to create a new post
    // The Authentication header will be added to the request automatically by our Interceptor service
    this.http.post('http://otcicali.uao.edu.co/index.php/wp-json/wp/v2/posts', data).subscribe(data => {
      // tell the app that the operation was a success
      this.events.publish('wordpress:savestatus', { state: 'finished' });
      this.events.publish('wordpress:createdreport');
    }, error => {
      this.events.publish('wordpress:savestatus', { state: 'error', message: error });
      


    });
  }
}