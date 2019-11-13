import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public _http: HTTP
  ) { }
  
  // public login(user: string, password: string){
  //   this._http.post('https://college-nestbackend.herokuapp.com/login/signin', {
  //     user: user,
  //     password: password
  //   }, {});
  // }
}
