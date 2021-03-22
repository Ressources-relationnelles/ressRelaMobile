import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTyperelationPageRoutingModule } from './admin-typerelation-routing.module';

import { AdminTyperelationPage } from './admin-typerelation.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTyperelationPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [AdminTyperelationPage]
})
export class AdminTyperelationPageModule {}
