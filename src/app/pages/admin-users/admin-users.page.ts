import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserPage } from '../user/user.page';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {
  users: Observable<any>;

  constructor(private userService : UserService, private modalCtrl : ModalController) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    console.log(this.users);
  }

  async openUserModal(id) {
    const modal = await this.modalCtrl.create({
      component: UserPage,
      componentProps: {
        id
      }
    });
    await modal.present();
  }

  async createUser() {
    const modal = await this.modalCtrl.create({
      component: UserPage
    });
    await modal.present();
  }

}
