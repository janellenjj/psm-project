import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluatorPageRoutingModule } from './evaluator-routing.module';

import { EvaluatorPage } from './evaluator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluatorPageRoutingModule
  ],
  declarations: [EvaluatorPage]
})
export class EvaluatorPageModule {}
