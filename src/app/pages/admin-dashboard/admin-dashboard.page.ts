import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/Models/UserI';
import { AuthService } from 'src/app/services/auth.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { RessourcePage } from '../ressource/ressource.page';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  // ressources : Observable<any>
  ressources :Array<any>
  allRessources : Array<any>

  constructor(private auth: AuthService,
    private ressourceService: RessourceService,
    private modalCtrl: ModalController)
  {
    this.ressourceService.getAdminRessources().subscribe(res => {
      this.allRessources = res;
      this.ressources = res;
    })
  }

  ngOnInit() {
    // this.ressources = this.ressourceService.getAdminRessources();
    
  }

  async openRessource(id) {
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
}
