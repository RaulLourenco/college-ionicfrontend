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

  studentName = [];
  studentPerformance = [];
  classArray = [];

  constructor(private db: AngularFirestore,
    private camera: Camera,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.infoClass('ECP6BN-MCA');
  }

  customPopoverOptions: any = {
    header: 'Data',
    subHeader: 'Selecione a data desejada',
    message: 'Selecione uma das datas abaixo.'
  };

  public async infoClass(userClass) {
    let arr: any = [];
    console.log('userClass recebido: ', userClass);
    this.classInformation(userClass);
    const snapshot = await firebase.firestore().collection('students').get();
    const wholeStudents = snapshot.docs.map(doc => {
      const studentsData = doc.data();
      return studentsData;
    });
    arr = wholeStudents;
    try {
      let students;
      let arrName = [];
      let arrPerformance = [];
      arr.map(doc => {
        this.db.collection('students').doc(doc.email).get().toPromise().then(student => {
          if (student.exists) {
            students = student.data();
            if (students.class == userClass) {
              console.log('O aluno pertence a turma!');
              doc.performance.map(performance => {
                if (performance.name == 'Projeto Interdisciplinar - 6B') {
                  arrName.push(doc.name);
                  arrPerformance.push(performance.absense);
                }
              });
            }
          }
        });
      });
      console.log('este eh o arrName:', arrName);
      console.log('este eh o arrPerfomance: ', arrPerformance);
      this.studentName = arrName;
      this.studentPerformance = arrPerformance;
    } catch (err) {
      console.error(err.message);
      console.error(err.code);
    }
  }

  public async classInformation(userClass) {
    const user = firebase.auth().currentUser;
    const professorEmail = user.email;
    let className;
    this.db.collection('subjects').doc(userClass).get().toPromise().then(subj => {
      if (subj.exists) {
        const subjData = subj.data();
        className = subjData.name;
      }
    });
    this.db.collection('professor').doc(professorEmail).get().toPromise().then(prof => {
      if (prof.exists) {
        const profData = prof.data();
        let classesArray = [];
        classesArray = profData.classes;
        for (let i = 0; i < classesArray.length; i++) {
          className.map(name => {
            if (name == classesArray[i].name) {
              const arr = [];
              arr.push(classesArray[i]);
              this.classArray = arr;
            }
          });
        }
        return this.classArray;
      }
    });
  }

  public savePresence() {
    console.log('SALVANDO!')
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
