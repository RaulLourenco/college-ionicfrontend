import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-newevent-student',
  templateUrl: './newevent-student.page.html',
  styleUrls: ['./newevent-student.page.scss'],
})
export class NeweventStudentPage implements OnInit {

  eventStudent: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  public goBack() {
    this.router.navigate(['/home/tabs-student/calendar-student']);
  }

  public onFinish(description, date){
    console.log(description, date);
  }

  public save(){
    console.log('salvando');
  }

  initializeForm() {
    this.eventStudent = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

}
