import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  base64Image: string;
  isbase64PicReady: boolean = false;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  takePicture(){
    let options = {
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 100,
      allowEdit: true,
      correctOrientation: false,
      saveToPhotoAlbum: true,
      // mediaType: 0
    };
    Camera.getPicture(options)
    .then((imageData)=>{
      this.base64Image = "data:image/jpeg;base64," + imageData;

      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);
      this.alertMessage('base64Image', this.base64Image);
      this.isbase64PicReady = true;
    })
    .catch(err=>{
      console.log(err);
      this.alertMessage('err', err);
      this.isbase64PicReady = false;
    })
  }

  takePictureFromGallery() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 100,
      allowEdit: true,
      correctOrientation: false,
      saveToPhotoAlbum: true,
      mediaType: 0,
      sourceType: 0  // default camera =1
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;

      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);

      this.alertMessage('base64Image', this.base64Image);
      this.isbase64PicReady = true;
    }, (err) => {
      console.log(err);
      this.alertMessage('err', err);
      this.isbase64PicReady = false;
    });
  }

  upload2Firebase() {

    let imageName: string = 'IMG-' + new Date().getTime() + '.jpg';
    let storageRef = firebase.storage().ref('images/' + imageName);

    let base64Message = this.base64Image;
    let btnUpload = document.getElementById('btnUpload');
    btnUpload.setAttribute("style", "background-color: grey;")

    storageRef.putString(base64Message,'data_url',{contentType: 'image/png'})
    .then((snapshot)=>{
      console.log('base64 string uploaded!');
      btnUpload.setAttribute("style", "background-color: green;")
      alert('base64 string uploaded!');
      this.isbase64PicReady = false;
    })
    .catch((err)=>{
      btnUpload.setAttribute("style", "background-color: red;")
      alert(err);
    })
  }    

  loadPhotos(){
    let cameraImageSelector = document.getElementById('camera-image-load');
    var storageRef = firebase.storage().ref('images/IMG-1490020882308.jpg');
    storageRef.getDownloadURL().then((url)=>{
      cameraImageSelector.setAttribute('src',url);
      alert(url);
    })
    .catch(err=>alert(err))
  } 

  alertMessage(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK');
          }
        }
      ]
    })
    alert.present();
  }

}
