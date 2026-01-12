import { Routes } from '@angular/router';
import { Home } from '@app/pages/home/home';
import { StapleGameService } from '@core/services/staple-game-service';
import { CommanderGameService } from '@core/services/commander-game-service';
import { GAME_SERVICE } from '@core/services/game.token';



export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: Home,
    },
    {
        path: 'staple',
        loadComponent: () =>
            import('@app/pages/game/game').then(m => m.Game),
        providers: [
            { provide: GAME_SERVICE, useExisting: StapleGameService }
        ]
    },
    {
        path: 'commander',
        loadComponent: () =>
            import('@app/pages/game/game').then(m => m.Game),
        providers: [
            { provide: GAME_SERVICE, useExisting: CommanderGameService }
        ]
    },
    {
        path: 'card',
        loadComponent: () =>
            import('@app/pages/card-game/card-game')
                .then(m => m.CardGameComponent),
    },
    {
        path: 'oracle',
        loadComponent: () =>
            import('@app/pages/oracle-game/oracle-game')
                .then(m => m.OracleGameComponent),
    },
    {
        path: 'about',
        loadComponent: () => import('@app/pages/about/about').then(m => m.About),
    },
    {
        path: 'privacy',
        loadComponent: () => import('@app/pages/privacy/privacy').then(m => m.Privacy),
    },
    {
        path: 'imprint',
        loadComponent: () => import('@app/pages/imprint/imprint').then(m => m.Imprint),
    },
    {
        path: '**',
        component: Home,
    },
];
