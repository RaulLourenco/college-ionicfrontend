import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  professorName;
  professorProfile;
  professorSubjects;
  professorPhone;
  professorEmail;

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
    const professorEmail = user.email;
    this.db.collection('professor').doc(professorEmail).get().toPromise().then(
      async doc => {
        if (doc.exists) {
          const professorData = doc.data();
          this.professorName = professorData.name;
          this.professorProfile = professorData.profile;
          this.professorSubjects = professorData.subjects;
          this.professorPhone = professorData.phone;
          this.professorEmail = professorData.email;
        };
      }).catch(err => {
        console.error(err.code);
        console.error(err.message);
      })
  }

}
