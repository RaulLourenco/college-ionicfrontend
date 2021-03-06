import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login-student', loadChildren: './pages/login/login-student/login-student.module#LoginStudentPageModule' },
  { path: 'login-professor', loadChildren: './pages/login/login-professor/login-professor.module#LoginProfessorPageModule' },
  { 
    path: 'home',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'newevent', loadChildren: './pages/newevent/newevent.module#NeweventPageModule' },
  { path: 'presence/:id', loadChildren: './pages/presence/presence.module#PresencePageModule' },
  { path: 'newevent-student', loadChildren: './pages/newevent-student/newevent-student.module#NeweventStudentPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
