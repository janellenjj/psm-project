import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluatorPage } from './evaluator.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluatorPageRoutingModule {}
