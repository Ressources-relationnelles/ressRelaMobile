import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { TypeRelationService } from 'src/app/services/type-relation.service';
import { TyperelationPage } from '../typerelation/typerelation.page';

@Component({
  selector: 'app-admin-typerelation',
  templateUrl: './admin-typerelation.page.html',
  styleUrls: ['./admin-typerelation.page.scss'],
})
export class AdminTyperelationPage implements OnInit {

  allTypes : Array<any>
  types :Array<any>


  constructor(private typeRelationService : TypeRelationService, private modalCtrl : ModalController, private db : AngularFirestore) {
    // this.searchControl = new FormControl();
    this.typeRelationService.getTypeRelation().subscribe(res => {
      this.allTypes = res;
      this.types = res;
      console.log("res",res);

    })

  }

  ngOnInit() {

  }

  async openTypeRelationModal(id) {
    const modal = await this.modalCtrl.create({
      component: TyperelationPage,
      componentProps: {
        id
      }
    });
    await modal.present();
  }

  async createCategory() {
    const modal = await this.modalCtrl.create({
      component: TyperelationPage
    });
    await modal.present();
  }


  onInput(e) {
    var value = e.srcElement.value;
    // console.log(value);

    if (!value || value =='') {
      this.types = this.allTypes;
    }

    value = value.toLowerCase();

    this.types = this.allTypes.filter( type =>
      type.nom.toLowerCase().indexOf(value) > -1)
  }
}
