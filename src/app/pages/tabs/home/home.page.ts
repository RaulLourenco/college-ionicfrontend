import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userData: any;
  subject: any;

  constructor(private db: AngularFirestore,
              private router: Router) { }

  ngOnInit() {
    this.getUserData('816117561');
    this.subjects();
    console.log('esta eh a chamada: ', this.subjects());
  }

  public getUserData(ra) {
    this.db.collection('student').doc(ra).get().toPromise().then(doc => {
      this.userData = doc.data();
      return this.userData();
    });
  }

  public async subjects() {
    const snapshot = await firebase.firestore().collection('subjects').get()
    console.log('este eh o snapshot: ', snapshot);
    return snapshot.docs.map(doc =>
      doc.data());
  }

  public async registeringPresence(){
    this.router.navigate(['/presence']);
  }
}
