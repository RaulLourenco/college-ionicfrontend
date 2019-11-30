import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
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
    private router: Router) { }

  ngOnInit() {
    this.professorClasses();
  }

  public async registeringPresence() {
    this.router.navigate(['/presence']);
  }

  public professorClasses() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    console.log('email: ', email);
    this.db.collection('professor').doc(email).get().toPromise().then(professor => {
      if (professor.exists) {
        const professorData = professor.data();
        console.log('professor', professorData);
        this.profName = professorData.name.split(' ')[0];
        console.log('classes: ', professorData.classes);
        this.profClasses = professorData.classes;        
      }
    }).catch(err => {
      console.error(err.code);
      console.error(err.message);
    });
  }
}
