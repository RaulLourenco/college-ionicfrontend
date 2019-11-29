import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  subjectsArray = [];
  performanceArray = [];
  userName;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.subjects();
  }

  public subjects() {
    const user = firebase.auth().currentUser;
    const userEmail = user.email;
    this.db.collection('students').doc(userEmail).get().subscribe(doc => {
      if (doc.exists) {
        const userData = doc.data();
        const userClass = userData.class;
        this.userName = userData.name.split(' ')[0];
        this.performanceArray = userData.performance;
        this.db.collection('subjects').doc(userClass).get().toPromise().then(subject => {
          if (subject.exists) {
            const subjectData = subject.data();
            this.subjectsArray = subjectData.name;
          }
        }).catch(err => {
          console.error(err.code);
          console.error(err.message);
        });
      }
    });
  }
}