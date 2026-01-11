import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { StapleGameService } from '@core/services/staple-game-service';
import { Game } from './pages/game/game';
import { CommanderGameService } from '@core/services/commander-game-service';
import { GAME_SERVICE } from '@core/services/game.token';
import { CardGameComponent } from './pages/card-game/card-game';
import { OracleGameComponent } from './pages/oracle-game/oracle-game';
import { About } from './pages/about/about';
import { Privacy } from './pages/privacy/privacy';
import { Imprint } from './pages/imprint/imprint';


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
        path: 'card',
        component: CardGameComponent
    },
    {
        path: 'oracle',
        component: OracleGameComponent
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'privacy',
        component: Privacy
    },
    {
        path: 'imprint',
        component: Imprint
    },
    {
        path: '**',
        component: Home,
    },
];
