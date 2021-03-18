import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardPage } from './admin-dashboard.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/admin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminDashboardPage,
    children: [
      {
        path: 'users',
        loadChildren:'../admin-users/admin-users.module#AdminUsersPageModule'
      }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule {}
