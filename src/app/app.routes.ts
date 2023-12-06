import { Routes } from '@angular/router';

/**
 * Pages paths to be used on the routes
 *
 * @export
 * @enum {number}
 */
export const pagesPaths = {
  dashboard: 'dashboard',
  logger: 'logger',
  show: 'show',
  notFound: 'not-found'
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: pagesPaths.dashboard,
    loadComponent: () =>
      import('@pages/dashboard/dashboard.page').then(
        (m) => m.DashBoardPage
      )
  },
  {
    path: pagesPaths.logger,
    loadComponent: () =>
      import('@pages/debuger/debuger.page').then(
        (m) => m.DebugerPage
      )
  },
  {
    path: pagesPaths.notFound,
    loadComponent: () =>
      import('@pages/error/error.page').then(
        (m) => m.ErrorPage
      )
  },
  { path: '**', redirectTo: pagesPaths.notFound }
];
