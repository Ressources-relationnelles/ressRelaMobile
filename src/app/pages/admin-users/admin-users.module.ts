import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUsersPage } from './admin-users.page';
import { AdminUsersPageRoutingModule } from './admin-users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUsersPageRoutingModule
  ],
  declarations: [AdminUsersPage]
})
export class AdminUsersPageModule {}
