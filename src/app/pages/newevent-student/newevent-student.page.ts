import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Component({
  selector: 'app-newevent-student',
  templateUrl: './newevent-student.page.html',
  styleUrls: ['./newevent-student.page.scss'],
})
export class NeweventStudentPage implements OnInit {

  eventForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.initializeForm();
  }

  public goBack() {
    this.router.navigate(['/home/tabs-student/calendar-student']);
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
    this.db.collection('students').doc(userEmail).update({ events: firebase.firestore.FieldValue.arrayUnion(events) });
    this.router.navigate(['/home/tabs-student/calendar-student']);
  }

  initializeForm() {
    this.eventForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

}
