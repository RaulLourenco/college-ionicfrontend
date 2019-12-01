import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-presence',
  templateUrl: './presence.page.html',
  styleUrls: ['./presence.page.scss'],
})
export class PresencePage implements OnInit {

  studentsArray = [] as any;

  constructor(private db: AngularFirestore,
    private camera: Camera,
    private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  customPopoverOptions: any = {
    header: 'Data',
    subHeader: 'Selecione a data desejada',
    message: 'Selecione uma das datas abaixo.'
  };

  public async infoClass(userClass) {
    let arr: any = [];
    console.log('userClass recebido: ', userClass);
    const snapshot = await firebase.firestore().collection('students').get();
    const wholeStudents = snapshot.docs.map(doc => {
      const studentsData = doc.data();
      return studentsData;
    });
    arr = wholeStudents;
    for (let i = 0; i < arr.length; i++) {
      const email = arr[i].email;
      this.db.collection('students').doc(email).get().toPromise().then(async student => {
        if (student.exists) {
          const students = student.data();
          if (students.class == userClass) {
            console.log('O aluno pertence a turma!');
            arr = students;
          } else {
            console.log('Este aluno não pertence a essa classe!')
          }
        }
      });
      this.studentsArray = arr;
    }
  }

  public openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadImagesAndUpdatePresence(base64Image);
    }, (err) => {
      console.error(err.message);
      console.error(err.code);
    });
  }

  uploadImagesAndUpdatePresence(image): Promise<any> {
    return new Promise(async (resolve, reject) => {

      // let fileName = `${key}_${this.photoData.date}`;
      const newDate = new Date();
      let fileName = '30-11-2019';
      // let filePath = `ECP6BN-MCA/${key}/${fileName}`;
      let filePath = `ECP6BN-MCA/${fileName}`;
      const fileRef: AngularFireStorageReference = this.storage.ref(filePath);
      let data = await fileRef.putString(image, 'data_url');
      console.log('UPLOAD DA IMAGEM');
      resolve(console.log('A FOTO FOI ENVIADA!'));
      // try {
      //   // Upando a imagem base64
      //   let data = await fileRef.putString(this.photoData.img, 'data_url');
      //   let arrayUrl = [];
      //   // Aguardando a url da foto ficar disponivel e colocala no array;
      //   fileRef.getDownloadURL().subscribe(async (url) => {
      //     console.log('url', url);
      //     if (url) {
      //       arrayUrl.push(url);
      //       console.log('arrayUrl', arrayUrl);
      //       await this.afDatabase.object('adocao/pets/' + key).update({ "fotoUrls": arrayUrl });
      //       console.log('fotoUrl inserida');
      //       resolve('Foto inserida');
      //     }
      //   }, erro => reject(erro));
      // } catch (e) {
      //   reject(e);
      // }
    });
  }
}
