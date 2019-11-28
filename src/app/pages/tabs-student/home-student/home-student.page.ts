import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {

  private subjectsArr = [];
  private userName;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
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
          this.db.collection('subjects').doc(userClass).get().toPromise().then(subject => {
            if (subject.exists) {
              const subjectData = subject.data();
              this.subjectsArr.push(subjectData);
              console.log('subjectData: ', subjectData);
              return this.subjectsArr;
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
