import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramModalPage } from './program-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramModalPageRoutingModule {}
