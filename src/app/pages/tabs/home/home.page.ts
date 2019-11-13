import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private userData: any;
  private subject: any;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.getUserData('816117561');
    this.subjects('Sistemas Operacionais');
  }

  public getUserData(ra) {
    this.db.collection('student').doc(ra).get().toPromise().then(doc => {
      this.userData = doc.data();
      return this.userData();
    });
  }

  public subjects(subject) {
    this.db.collection('subjects').doc(subject).get().toPromise().then(subjects => {
      console.log('data: ', subjects.data());
      this.subject = subjects.data();
      return this.subject();
    });
  }
}
