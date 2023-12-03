import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@pages/dashboard/dashboard.page').then(
        (m) => m.DashBoardPage
      )
  },
  {
    path: 'logger',
    loadComponent: () =>
      import('@pages/debuger/debuger.page').then(
        (m) => m.DebugerPage
      )
  }
];
