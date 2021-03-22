import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TyperelationPageRoutingModule } from './typerelation-routing.module';

import { TyperelationPage } from './typerelation.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    TyperelationPageRoutingModule
  ],
  declarations: [TyperelationPage]
})
export class TyperelationPageModule {}
