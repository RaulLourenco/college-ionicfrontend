import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userData: any;
  subject: any;

  constructor(private db: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
  }

  public async registeringPresence() {
    this.router.navigate(['/presence']);
  }
}
