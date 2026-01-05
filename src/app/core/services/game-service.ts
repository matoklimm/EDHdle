import { Signal } from '@angular/core';

import { Guess } from '@core/models/guess';
import { Card } from '@core/models/card';

export interface GameService {
  readonly guesses: Signal<Guess[]>;
  readonly suggestions: Signal<Card[]>;

  submitGuess(cardName: string): void;
}
