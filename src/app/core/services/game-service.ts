import { Signal } from '@angular/core';

import { Guess } from '@core/models/guess';
import { Card } from '@core/models/card';

export interface GameService {
  readonly guesses: Signal<Guess[]>;
  readonly cards: Signal<Card[]>;
  readonly target: Signal<Card | null>;
  readonly yesterdayTarget: Signal<Card | null>;
  readonly isGameWon: Signal<boolean>;
  readonly guessedNames: Signal<string[]>;

  submitGuess(cardName: string): void;
}
