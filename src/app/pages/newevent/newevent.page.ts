import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.page.html',
  styleUrls: ['./newevent.page.scss'],
})
export class NeweventPage implements OnInit {

  eventForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.initializeForm();
  }

  public goBack() {
    this.router.navigate(['/home/tabs/calendar']);
  }

  public onFinish(description, date) {
    const model = {
      description: description,
      date: date.split('T')[0]
    }
    let events: any = [];
    events = model;
    const user = firebase.auth().currentUser;
    const userEmail = user.email;
    this.db.collection('professor').doc(userEmail).update({ events: firebase.firestore.FieldValue.arrayUnion(events) });
    this.router.navigate(['/home/tabs/calendar']);
  }

  initializeForm() {
    this.eventForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
}
