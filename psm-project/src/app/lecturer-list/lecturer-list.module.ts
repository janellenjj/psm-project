import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturerListPageRoutingModule } from './lecturer-list-routing.module';

import { LecturerListPage } from './lecturer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturerListPageRoutingModule
  ],
  declarations: [LecturerListPage]
})
export class LecturerListPageModule {}
