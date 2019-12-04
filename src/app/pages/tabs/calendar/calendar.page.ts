import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  eventsArr = [];

  constructor(private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.events();
  }

  public addEvent() {
    this.router.navigate(['/newevent']);
  }

  ionViewWillEnter() {
    this.events();
  }

  public events() {
    const user = firebase.auth().currentUser;
    const userEmail = user.email;
    this.db.collection('professor').doc(userEmail).get().toPromise().then(
      async event => {
        if (event.exists) {
          this.eventsArr = event.data().events;
        }
      }).catch(err => {
        console.error(err.code);
        console.error(err.message);
      });
  }

  public delete(description, date) {
    console.log('deletando');
    const model = {
      description,
      date
    }
    let events: any = [];
    events = model;
    const user = firebase.auth().currentUser;
    const userEmail = user.email;
    this.db.collection('professor').doc(userEmail).update({ events: firebase.firestore.FieldValue.arrayRemove(events) });
    this.router.navigate(['/home/tabs/calendar']);
  }

}
