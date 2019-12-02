import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-calendar-student',
  templateUrl: './calendar-student.page.html',
  styleUrls: ['./calendar-student.page.scss'],
})
export class CalendarStudentPage implements OnInit {

  eventsArr = [];

  constructor(private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {

  }

  public addEvent() {
    this.router.navigate(['/newevent-student']);
  }

  ionViewWillEnter() {
    this.events();
  }

  public events() {
    const user = firebase.auth().currentUser;
    const userEmail = user.email;
    this.db.collection('students').doc(userEmail).get().toPromise().then(
      async event => {
        if (event.exists) {
          this.eventsArr = event.data().events;
        }
      }).catch(err => {
        console.error(err.code);
        console.error(err.message);
      });
  }

  public delete() {
    console.log('deletando');
  }

}
