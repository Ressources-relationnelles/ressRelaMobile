import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryPage } from '../category/category.page';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.page.html',
  styleUrls: ['./admin-categories.page.scss'],
})
export class AdminCategoriesPage implements OnInit {

  allCategories : Array<any>
  categories :Array<any>


  constructor(private categoryService : CategoryService, private modalCtrl : ModalController, private db : AngularFirestore) {
    // this.searchControl = new FormControl();
    this.categoryService.getCategories().subscribe(res => {
      this.allCategories = res;
      this.categories = res;
    })

  }

  ngOnInit() {

  }

  async openCategoryModal(id) {
    const modal = await this.modalCtrl.create({
      component: CategoryPage,
      componentProps: {
        id
      }
    });
    await modal.present();
  }

  async createCategory() {
    const modal = await this.modalCtrl.create({
      component: CategoryPage
    });
    await modal.present();
  }


  onInput(e) {
    var value = e.srcElement.value;
    // console.log(value);

    if (!value || value =='') {
      this.categories = this.allCategories;
    }

    value = value.toLowerCase();

    this.categories = this.allCategories.filter( category =>
      category.nom.toLowerCase().indexOf(value) > -1)
  }
}
