import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  subjectsArray = [];
  userName;
  userAbsense;
  userGrade;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.subjects();
  }

  public async subjects() {
    //verificar qual user esta logado
    const user = firebase.auth().currentUser;
    const userEmail = user.email;
    this.db.collection('students').doc(userEmail).get().toPromise().then(
      async doc => {
        if (doc.exists) {
          const userData = doc.data();
          const userClass = userData.class;
          this.userName = userData.name.split(' ')[0];
          this.userAbsense = userData.absense;
          this.userGrade = userData.grade;
          this.db.collection('subjects').doc(userClass).get().toPromise().then(subject => {
            if (subject.exists) {
              let arr = [];
              const subjectData = subject.data();
              arr.push(subjectData.name);
              console.log('subjectData: ', subjectData);
              console.log('this.subjectsArr: ', arr[0]);
              this.subjectsArray.push(arr[0]);
              return this.subjectsArray;
            }
          }).catch(err => {
            console.error(err.code);
            console.error(err.message);
          });
        }
      }).catch(err => {
        console.error(err.code);
        console.error(err.message);
      });
  }
}
