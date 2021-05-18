import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'admin',
    // component: AdminPage,
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'program',
    loadChildren: () => import('./program/program.module').then( m => m.ProgramPageModule)
  },
  {
    path: 'program-modal',
    loadChildren: () => import('./program-modal/program-modal.module').then( m => m.ProgramModalPageModule)
  },
  {
    path: 'lecturer',
    loadChildren: () => import('./lecturer/lecturer.module').then( m => m.LecturerPageModule)
  },
  {
    path: 'lecturer-modal',
    loadChildren: () => import('./lecturer-modal/lecturer-modal.module').then( m => m.LecturerModalPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'student-modal',
    loadChildren: () => import('./student-modal/student-modal.module').then( m => m.StudentModalPageModule)
  },
  {
    path: 'student-list',
    loadChildren: () => import('./student-list/student-list.module').then( m => m.StudentListPageModule)
  },
  {
    path: 'lecturer-list',
    loadChildren: () => import('./lecturer-list/lecturer-list.module').then( m => m.LecturerListPageModule)
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./supervisor/supervisor.module').then( m => m.SupervisorPageModule)
  },
  {
    path: 'proposal',
    loadChildren: () => import('./proposal/proposal.module').then( m => m.ProposalPageModule)
  },
  {
    path: 'proposal-modal',
    loadChildren: () => import('./proposal-modal/proposal-modal.module').then( m => m.ProposalModalPageModule)
  },
  {
    path: 'proposal-list',
    loadChildren: () => import('./proposal-list/proposal-list.module').then( m => m.ProposalListPageModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'evaluator',
    loadChildren: () => import('./evaluator/evaluator.module').then( m => m.EvaluatorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
