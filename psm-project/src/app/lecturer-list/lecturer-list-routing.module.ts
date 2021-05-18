import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturerListPage } from './lecturer-list.page';

const routes: Routes = [
  {
    path: '',
    component: LecturerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturerListPageRoutingModule {}
