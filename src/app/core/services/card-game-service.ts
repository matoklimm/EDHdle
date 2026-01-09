import { Injectable } from '@angular/core';
import { BaseGameService } from './base-game-service';

@Injectable({ providedIn: 'root' })
export class CardGameService extends BaseGameService {
  constructor() {
    super({
      dataUrl: 'data/commanders.json',
      storageKey: 'CardGameService',
      modeKey: 'card'
    });
  }
}
