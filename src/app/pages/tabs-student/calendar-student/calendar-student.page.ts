import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calendar-student',
  templateUrl: './calendar-student.page.html',
  styleUrls: ['./calendar-student.page.scss'],
})
export class CalendarStudentPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public addEvent(){
    this.router.navigate(['/newevent']);
  }

}
