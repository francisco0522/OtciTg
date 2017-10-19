import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '../wp/http-client';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';




@Injectable()
export class UserProvider {
  constructor(public events: Events, private http: HttpClient, private stor: Storage, public toastCtrl: ToastController) {
  }
  // this is a unique token for storing auth tokens in your local storage
  // for later use
  AUTHTOKEN: string = "myauthtokenkey";
  

  checkedLoggedInStatus() {
    this.stor.get(this.AUTHTOKEN).then(output => {
      if (output) {
        console.log(`User is logged in: ${output}`);
        this.events.publish('user:login');
      }
      if (output!=null){
      let toast = this.toastCtrl.create({
        message: "Bienvenido de nuevo",
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }});
     
  }




  // determine if the user/password can be authenticated and fire an event when finished
  login(username, password) {
    var auth = window.btoa(username + ":" + password); 
    // remove any existing auth tokens from local storage
    this.stor.remove(this.AUTHTOKEN);
    // the important bit, contact the WP end point and ask for a token
   
        // great we are authenticated, save the token in localstorage for future use
        this.stor.set(this.AUTHTOKEN, auth);
        // and start using the token in every subsequent http request to the WP server
        this.http.addHeader('Authorization', 'Basic '+ window.btoa( username + ":" + password ) );
       

        let data = {
          title: "Probando"
        };
        
        this.http.post('http://otcicali.uao.edu.co/index.php/wp-json/wp/v2/posts/1048', data).subscribe(data => {
         
        this.events.publish('user:login');

        let toast = this.toastCtrl.create({
          message: "Ha iniciado sesión como: " + username,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();

        }, error => {
          this.events.publish('wordpress:savestatus', { state: 'error', message: error });
          
          let toast = this.toastCtrl.create({
            message: "Lo siento no se pudo iniciar sesión, verifique su nombre de usuario y contraseña",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
    
        });
       
       
       
      

   

      error => {
        this.events.publish('wordpress:savestatus', { state: 'error', message: error });
        console.log(error)
        
      } //

           
      }

      
        

  logout() {
    this.stor.remove(this.AUTHTOKEN);
    this.events.publish('user:logout');
  }
}

//npm install -g ionic@3.1.2.0