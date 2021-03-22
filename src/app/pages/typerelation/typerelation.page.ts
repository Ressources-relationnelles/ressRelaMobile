import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { TypeRelationService } from 'src/app/services/type-relation.service';

@Component({
  selector: 'app-typerelation',
  templateUrl: './typerelation.page.html',
  styleUrls: ['./typerelation.page.scss'],
})
export class TyperelationPage implements OnInit {

  typeForm : FormGroup ;
  id = null;
  user = "";

  constructor(
    private fb : FormBuilder,
    private modalCtrl : ModalController,
    private loadingCtrl : LoadingController,
    private typeService : TypeRelationService,
    private navParam : NavParams
  ) { }

  ngOnInit() {
    this.typeForm = this.fb.group({
      nom: ['', Validators.required]
    });
    this.id = this.navParam.get('id');


    if (this.id) {
      this.typeService.getTypeRelatio(this.id).subscribe( type => {
        console.log("category Form", this.typeForm);

        this.typeForm.patchValue({
          nom: type['nom']
        });

        // this.userForm.controls['nom'].disable();
        // this.userForm.controls['prenom'].disable();
        // this.userForm.controls['email'].disable();
        // this.userForm.controls['role'].disable();
      })
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async saveOrUpdate() {
    let loading = await this.loadingCtrl.create({
      message: 'Chargement...'
    });
    await loading.present();

    this.typeService.createOrUpdateTypeRelation(this.id, this.typeForm.value).then(() => {
      loading.dismiss();
      this.close();
    }, err => {
      loading.dismiss();
    })
  }

  deleteTypeRelation() {
    this.typeService.deleteTypeRelation(this.id).then( () => {
      this.modalCtrl.dismiss();
    })
  }

}
