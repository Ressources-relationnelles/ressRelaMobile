import { Component } from '@angular/core';
import{ModalController}from '@ionic/angular';
import { Observable } from 'rxjs';
import { RessourceService } from '../services/ressource.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // ressources : Observable<any>

  ressources :Array<any>
  allRessources : Array<any>
  constructor(public modalController:ModalController, public ressourceService : RessourceService)
  {
    this.ressourceService.getRessourcesActive().subscribe(res => {
      this.allRessources = res;
      this.ressources = res;
    })
  }

  ngOnInit() {
    // this.ressources = this.ressourceService.getRessourcesActive();
    // console.log(this.ressources);

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
