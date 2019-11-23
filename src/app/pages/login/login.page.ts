import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {}

  public iamStudent(){
    this.router.navigate(['/login-student']);
  }
  
  public iamProfessor(){
    this.router.navigate(['/login-professor']);
  }
}
