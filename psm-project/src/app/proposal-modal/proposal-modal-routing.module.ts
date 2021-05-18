import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposalModalPage } from './proposal-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProposalModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposalModalPageRoutingModule {}
