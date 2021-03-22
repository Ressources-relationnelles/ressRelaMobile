import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTyperelationPage } from './admin-typerelation.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTyperelationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTyperelationPageRoutingModule {}
