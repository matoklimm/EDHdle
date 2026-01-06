import { InjectionToken } from '@angular/core';
import { GameService } from './game-service';

export const GAME_SERVICE = new InjectionToken<GameService>('GAME_SERVICE');