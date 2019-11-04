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

  constructor(private loginService: LoginService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.initializeForm();
    // this.items = this.db.collection('student').valueChanges().subscribe(res => {
    //   console.log(res);
    //   this.items = res;
    // });
  }

  public async onSign(email, password) {
    // this.presentLoading();
    // this.loginService.login(this.userForm['user'].value, this.userForm['password'].value);
    this.db.collection('student').get().subscribe(res => {
      console.log(res);
    });
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      console.log('password aqui dentro: ', password);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    this.router.navigate(['/home/tabs/home']);
  }

  public async onSignup(ra) {
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
