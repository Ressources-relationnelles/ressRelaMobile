import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userForm : FormGroup;
  id = null;
  user = "";

  constructor(
    private fb : FormBuilder,
    private modalCtrl : ModalController,
    private loadingCtrl : LoadingController,
    private userService : UserService,
    private navParam : NavParams
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: [ '', Validators.email],
      role: ['', Validators.required]
    });
    this.id = this.navParam.get('id');

    if (this.id) {
      this.userService.getUser(this.id).subscribe( user => {
        console.log(user);
        this.userForm.patchValue({
          nom: user['nom'],
          prenom: user['prenom'],
          email: user['email'],
          role: user['role']
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

    this.userService.createOrUpdateUser(this.id, this.userForm.value).then(() => {
      loading.dismiss();
      this.close();
    }, err => {
      loading.dismiss();
    })
  }

  deleteUser() {
    this.userService.deleteUser(this.id).then( () => {
      this.modalCtrl.dismiss();
    })
  }


}
