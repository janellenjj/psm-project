import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProposalListPageRoutingModule } from './proposal-list-routing.module';

import { ProposalListPage } from './proposal-list.page';
import { PipeModuleModule } from '../pipe-module/pipe-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProposalListPageRoutingModule,
    PipeModuleModule
  ],
  declarations: [ProposalListPage]
})
export class ProposalListPageModule {}
