import{ModalController}from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../app/services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user;

  constructor(public modalController:ModalController, private auth : AuthService, private afAuth :AngularFireAuth) {}

  showSubmenu: boolean = false;
  showSubmenu2: boolean = false;

  ngOnInit() {
    this.user = this.auth.user;
    console.log("user.role", this.user);
    this.afAuth.authState.subscribe(auth => {
      console.log('Connecté: ' + auth);
    });

  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }
  menuItemHandler2(): void {
    this.showSubmenu2 = !this.showSubmenu2;
  }

  signOut() {
    this.auth.signOut();
  }
}
