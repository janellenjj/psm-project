import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturerPageRoutingModule } from './lecturer-routing.module';

import { LecturerPage } from './lecturer.page';
import { PipeModuleModule } from '../pipe-module/pipe-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturerPageRoutingModule,
    PipeModuleModule
  ],
  declarations: [LecturerPage]
})
export class LecturerPageModule {}
