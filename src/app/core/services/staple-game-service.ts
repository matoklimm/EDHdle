import { Injectable } from '@angular/core';
import { BaseGameService } from './base-game-service';

@Injectable({ providedIn: 'root' })
export class StapleGameService extends BaseGameService {
  constructor() {
    super({
      dataUrl: 'data/staples.json',
      storageKey: 'StapleGameService',
    });
  }
}