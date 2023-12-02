import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('@pages/folder/folder.page').then(
        (m) => m.FolderPage
      )
  }
];
