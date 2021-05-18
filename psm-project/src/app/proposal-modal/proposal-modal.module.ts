import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProposalModalPageRoutingModule } from './proposal-modal-routing.module';

import { ProposalModalPage } from './proposal-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProposalModalPageRoutingModule
  ],
  declarations: [ProposalModalPage]
})
export class ProposalModalPageModule {}
