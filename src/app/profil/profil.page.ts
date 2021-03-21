import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RessourcePage } from '../pages/ressource/ressource.page';
import { AuthService } from '../services/auth.service';
import { RessourceService } from '../services/ressource.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  user :Observable<any>;
  heart:any;
  // ressources : Observable<any>;

  ressources :Array<any>
  allRessources : Array<any>
  constructor(private auth : AuthService, private modalCtrl : ModalController, private ressourceService : RessourceService, private db : AngularFirestore, public afAuth : AngularFireAuth)
  {
    this.ressourceService.getRessourceByUser().subscribe(res => {
      this.allRessources = res;
      this.ressources = res;
    })
  }

  ngOnInit() {
    // this.ressources = this.ressourceService.getRessourceByUser();
    this.auth.currentUser.subscribe(data => {
      this.user = data;
      console.log(this.user, data);

    })
    // console.log('ressources : ', this.ressourceService.getRessourceByUser());
  }

  async openRessourceModal(id) {
    const modal = await this.modalCtrl.create({
      component: RessourcePage,
      componentProps: {
        id
      }
    });
    await modal.present();
  }

  signOut() {
    this.auth.signOut();
  }

  getUser(ide) {
    console.log("bonjour");

    // this.user = this.db.doc(`users/${ide}`);
  }

  onInput(e) {
    var value = e.srcElement.value;
    // console.log(value);

    if (!value || value =='') {
      this.ressources = this.allRessources;
    }

    value = value.toLowerCase();

    this.ressources = this.allRessources.filter( ressource =>
      ressource.title.toLowerCase().indexOf(value) > -1 ||
      ressource.desc.toLowerCase().indexOf(value) > -1)
  }
};
