import { Signal } from '@angular/core';

import { Card } from '@core/models/card';

export interface GameService {
  readonly guesses: Signal<Card[]>;
  readonly cards: Signal<Card[]>;
  readonly target: Signal<Card | null>;
  readonly yesterdayTarget: Signal<Card | null>;
  readonly isGameWon: Signal<boolean>;
  readonly wrongGuesses: Signal<number>;
  readonly guessedNames: Signal<string[]>;

  submitGuess(cardName: string): void;
}
