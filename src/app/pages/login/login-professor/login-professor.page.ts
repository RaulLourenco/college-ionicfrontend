import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase';

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.page.html',
  styleUrls: ['./login-professor.page.scss'],
})
export class LoginProfessorPage implements OnInit {

  userForm: FormGroup;
  items: any;

  constructor(private alertController: AlertController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.initializeForm();
  }

  private async onSign(ra, password) {
    this.presentLoading();
    const doc = this.db.collection('student').doc(ra)
      .get().toPromise().then(async doc => {
        if (doc.exists) {
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
              this.presentAlert('Senha errada! Tente novamente.');
              console.error(errorCode);
              console.error(errorMessage);
            });
        } else {
          this.dismissLoading();
          this.presentAlert('Documento nao existe.');
        }
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

  async presentAlert(message){
    const alertPresent = await this.alertController.create({
      message: message
    });
    return await alertPresent.present();
  }

  public goBack(){
    this.router.navigate(['/login']);
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
