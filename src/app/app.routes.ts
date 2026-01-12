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
        ],
        data: {
            title: 'EDHdle – Guess the MTG Staple',
            description: 'Guess today’s MTG staple card from hints like colors, mana cost, types, and keywords. A daily Magic guessing challenge.'
        }
    },
    {
        path: 'commander',
        loadComponent: () =>
            import('@app/pages/game/game').then(m => m.Game),
        providers: [
            { provide: GAME_SERVICE, useExisting: CommanderGameService }
        ],
        data: {
            title: 'EDHdle – Guess the Hidden MTG Commander',
            description: 'Guess today’s MTG commander card from hints like colors, mana cost, types, and keywords. A daily Magic guessing challenge.'
        }
    },
    {
        path: 'card',
        loadComponent: () =>
            import('@app/pages/card-game/card-game')
                .then(m => m.CardGameComponent),
        data: {
            title: 'EDHdle – Guess the Blurred MTG Commander',
            description: 'Guess today’s blurred MTG commander card. You will receive hints like mana cost, colors, and oracle text. A daily Magic guessing challenge.'
        }
    },
    {
        path: 'oracle',
        loadComponent: () =>
            import('@app/pages/oracle-game/oracle-game')
                .then(m => m.OracleGameComponent),
        data: {
            title: 'EDHdle – Guess the MTG Commander by Oracle Text',
            description: 'Guess today’s MTG commander card by its core game mechanic: the oracle text. You will receive hints like mana cost, colors, and artwork. A daily Magic guessing challenge.'
        }
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
