import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
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
    console.log(description, date);
  }

  initializeForm() {
    this.eventForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

}
