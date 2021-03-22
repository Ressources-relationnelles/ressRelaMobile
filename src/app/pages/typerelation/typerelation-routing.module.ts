import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TyperelationPage } from './typerelation.page';

const routes: Routes = [
  {
    path: '',
    component: TyperelationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TyperelationPageRoutingModule {}
