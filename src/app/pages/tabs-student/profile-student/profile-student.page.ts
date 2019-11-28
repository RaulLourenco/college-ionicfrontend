import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.page.html',
  styleUrls: ['./profile-student.page.scss'],
})
export class ProfileStudentPage implements OnInit {

  userName;
  userProfile;
  userClass;
  userRa;
  userEmail;

  constructor(private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.profile();
  }

  public exit() {
    this.router.navigate(['/login']);
  }

  public profile() {
    const user = firebase.auth().currentUser;
    const userEmail = user.email;
    this.db.collection('students').doc(userEmail).get().toPromise().then(
      async doc => {
        if (doc.exists) {
          const userData = doc.data();
          this.userName = userData.name;
          this.userProfile = userData.profile;
          this.userClass = userData.class;
          this.userRa = userData.ra;
          this.userEmail = userData.email;
          console.log('userData: ', userData);
        };
      }).catch(err => {
        console.error(err.code);
        console.error(err.message);
      })
  }
}
