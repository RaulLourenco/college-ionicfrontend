import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.page.html',
  styleUrls: ['./profile-student.page.scss'],
})
export class ProfileStudentPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public exit() {
    this.router.navigate(['/login']);
  }

}
