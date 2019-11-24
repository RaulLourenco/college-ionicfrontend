import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.page.html',
  styleUrls: ['./newevent.page.scss'],
})
export class NeweventPage implements OnInit {

  eventForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  public goBack() {
    this.router.navigate(['/home/tabs/calendar']);
  }

  public onFinish(description, date){
    console.log(description, date);
  }

  initializeForm() {
    this.eventForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
}
