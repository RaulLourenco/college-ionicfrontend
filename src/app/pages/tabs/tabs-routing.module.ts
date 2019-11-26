import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { TabsStudentPage } from '../tabs-student/tabs-student.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/calendar/calendar.module').then(m => m.CalendarPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs-student',
    component: TabsStudentPage,
    children: [
      {
        path: 'calendar-student',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs-student/calendar-student/calendar-student.module').then(m => m.CalendarStudentPageModule)
          }
        ]
      },
      {
        path: 'home-student',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs-student/home-student/home-student.module').then(m => m.HomeStudentPageModule)
          }
        ]
      },
      {
        path: 'profile-student',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs-student/profile-student/profile-student.module').then(m => m.ProfileStudentPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home-student',
        pathMatch: 'full'
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
