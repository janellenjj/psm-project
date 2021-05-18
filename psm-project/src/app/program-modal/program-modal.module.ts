import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramModalPageRoutingModule } from './program-modal-routing.module';

import { ProgramModalPage } from './program-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramModalPageRoutingModule
  ],
  declarations: [ProgramModalPage]
})
export class ProgramModalPageModule {}
