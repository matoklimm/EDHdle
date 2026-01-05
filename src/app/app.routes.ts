import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Commander } from './pages/commander/commander';
import { Staple } from './pages/staple/staple';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: Home,
    },
    {
        path: 'commander',
        component: Commander,
    },
    {
        path: 'staple',
        component: Staple,
    },
    {
        path: '**',
        component: Home,
    },
];
