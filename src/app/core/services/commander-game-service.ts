import { Injectable } from '@angular/core';

import { BaseGameService } from './base-game-service';

@Injectable({ providedIn: 'root' })
export class CommanderGameService extends BaseGameService {
  constructor() {
    super({
      dataUrl: 'data/commanders.json',
      storageKey: 'CommanderGameService',
    });
  }
}