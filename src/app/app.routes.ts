import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { StapleGameService } from '@core/services/staple-game-service';
import { Game } from './pages/game/game';
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
        component: Game,
        providers: [{ provide: GAME_SERVICE, useExisting: StapleGameService }]
    },
    {
        path: 'commander',
        component: Game,
        providers: [{ provide: GAME_SERVICE, useExisting: CommanderGameService }]
    },
    {
        path: '**',
        component: Home,
    },
];
