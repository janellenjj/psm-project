import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposalListPage } from './proposal-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProposalListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposalListPageRoutingModule {}
