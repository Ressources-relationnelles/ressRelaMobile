import{ModalController}from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../app/services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Observable } from 'rxjs';

export class SchedulePage {
  constructor(translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

  }
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  role;
  isAdmin: boolean

  constructor(public modalController:ModalController, private auth : AuthService, private afAuth :AngularFireAuth, translate: TranslateService, public menu: MenuController) {
    translate.setDefaultLang('fr');
  }

  showSubmenu: boolean = false;
  showSubmenu2: boolean = false;

  openEnd() {
    this.menu.close();
  }

  ngOnInit() {
    console.log("this.isAdmin", this.isAdmin);

    this.afAuth.authState.subscribe(auth => {
      // console.log('auth: ' + auth) ;
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user", user);

        firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            console.log("userProfileSnapshot", userProfileSnapshot);
            console.log("userProfileSnapshot.data() = ", userProfileSnapshot.data());
            console.log("userProfileSnapshot.data().role = ", userProfileSnapshot.data().role);
            this.isAdmin = userProfileSnapshot.data().role == "ADMIN" ? true : false;
            console.log("this.isAdmin2", this.isAdmin);

          });
      }
    });
  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }
  menuItemHandler2(): void {
    this.showSubmenu2 = !this.showSubmenu2;
  }

  signOut() {

    this.auth.signOut()

  }

  // isAdmin() {
  //   this.auth.user.subscribe( data => {
  //     console.log("auth dara user : " + data.role);
  //     if (data !== null) {
  //       this.admin = false;
  //     } else {
  //       this.admin = true;
  //     }
  //   })
  // }
}
