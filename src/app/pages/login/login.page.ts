import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular'
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  items: any;

  constructor(private alertController: AlertController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.initializeForm();
    // this.items = this.db.collection('student').valueChanges().subscribe(res => {
    //   console.log(res);
    //   this.items = res;
    // });
  }

  private async onSign(ra, password) {
    this.presentLoading();
    const alertPresent = await this.alertController.create({
      message: 'Senha errada! Tente novamente.'
    });
    const doc = this.db.collection('student').doc(ra)
      .get().toPromise().then(doc => {
        if (doc.exists) {
          console.log('este eh o data', doc.data());
          const email = doc.data().email;
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
              this.dismissLoading();
              this.router.navigate(['/home/tabs/home']);
            })
            .catch((error) => {
              this.dismissLoading();
              const errorCode = error.code;
              const errorMessage = error.message;
              alertPresent.present();
              console.error(errorCode);
              console.error(errorMessage);
            });
        } else {
          console.log('Documento nao existe.');
        }
      });
  }

  private getUserData() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const name = user.displayName;
        const email = user.email;
        const ra = user.uid;
      }
    });
  }

  private async onSignup(ra) {
    this.db.collection('student').doc(ra).set({
      course: 'ADS',
      name: 'Marlon Henrique',
      ra: '816118479'
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde....'
    });
    return await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
