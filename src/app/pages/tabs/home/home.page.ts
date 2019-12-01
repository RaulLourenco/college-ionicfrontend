import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { PresencePage } from '../../presence/presence.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  profName;
  profClasses = [];
  subject: any;

  constructor(private db: AngularFirestore,
              private router: Router,
              private presence: PresencePage) { }

  ngOnInit() {
    this.professorClasses();
  }

  public async registeringPresence(value) {
    this.router.navigate([`/presence/${value}`]);
    this.presence.infoClass(value);
  }

  public async professorClasses() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    this.db.collection('professor').doc(email).get().toPromise().then(professor => {
      if (professor.exists) {
        const professorData = professor.data();
        this.profName = professorData.name.split(' ')[0];
        this.profClasses = professorData.classes;
      }
    }).catch(err => {
      console.error(err.code);
      console.error(err.message);
    });
  }
}
