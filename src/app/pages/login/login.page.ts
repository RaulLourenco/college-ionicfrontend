import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular'
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;

  constructor(private loginService: LoginService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.initializeForm();
  }

  public async onSign() {
    this.presentLoading();
    this.loginService.login(this.userForm['user'].value, this.userForm['password']);
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Aguarde....'
    });
    return await loading.present();
  }

  async dismissLoading(){
    return await this.loadingController.dismiss();
  }

  initializeForm(){
    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
