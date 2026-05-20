import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full'
  },
  {
    path: 'loading',
    loadComponent: () => import('@shell/pages/loading-page/loading-page').then(m => m.LoadingPage)
  },
  {
    'path': 'menu',
    loadComponent: () => import('@shell/pages/main-menu-page/main-menu-page').then(m => m.MainMenuPage)
  },
  {
    path: 'game',
    loadComponent: () => import('@game/pages/game-page/game-page').then(m => m.GamePage)
  },
  {
    path: '**',
    redirectTo: 'loading'
  }
];
