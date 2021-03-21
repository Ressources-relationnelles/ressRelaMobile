import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categoryForm : FormGroup;
  id = null;
  user = "";

  constructor(
    private fb : FormBuilder,
    private modalCtrl : ModalController,
    private loadingCtrl : LoadingController,
    private categoryService : CategoryService,
    private navParam : NavParams
  ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      nom: ['', Validators.required]
    });
    this.id = this.navParam.get('id');


    if (this.id) {
      this.categoryService.getCategory(this.id).subscribe( category => {
        console.log("category Form", this.categoryForm);

        this.categoryForm.patchValue({
          nom: category['nom']
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

    this.categoryService.createOrUpdateCategory(this.id, this.categoryForm.value).then(() => {
      loading.dismiss();
      this.close();
    }, err => {
      loading.dismiss();
    })
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.id).then( () => {
      this.modalCtrl.dismiss();
    })
  }

}
