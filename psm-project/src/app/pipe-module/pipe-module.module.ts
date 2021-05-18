import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramPipePipe } from './program-pipe.pipe';
import { LecturerPipe } from './lecturer.pipe';
import { ProposalPipe } from './proposal.pipe';
import { StudentPipe } from './student.pipe'


@NgModule({
  declarations: [ProgramPipePipe, LecturerPipe, ProposalPipe, StudentPipe],
  imports: [
    CommonModule,
  ],
  exports:[
  	ProgramPipePipe,
  	LecturerPipe,
  	ProposalPipe,
  	StudentPipe
  ]
})
export class PipeModuleModule { }
