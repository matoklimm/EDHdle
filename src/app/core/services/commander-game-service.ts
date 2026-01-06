import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { dailyIndex } from './daily-random';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

import { GameService } from './game-service';
import { Card } from '@core/models/card';
import { Guess } from '@core/models/guess';

@Injectable({ providedIn: 'root' })
export class CommanderGameService implements GameService {
  private http = inject(HttpClient);

  constructor() {
    console.log("hello from the commander game service");
  }

  private _guesses = signal<Guess[]>([]);

  private _cards = toSignal(
    this.http.get<Card[]>('data/commanders.json'),
    { initialValue: [] }
  );

  private _target = computed<Card | null>(() => {
    const all = this._cards();
    if (!all.length) return null;
    return all[dailyIndex(all.length)];
  });


  readonly guesses = this._guesses.asReadonly();
  readonly cards = this._cards;
  readonly target = this._target;

  readonly isGameWon = computed(() =>
    this._guesses().some(g => g.isCorrect)
  );

  readonly guessedNames = computed(() =>
    this._guesses().map(g => g.card.name)
  );


  submitGuess(cardName: string): void {
    if (this.isGameWon()) return;

    const submittedCard = this._cards().find(c => c.name === cardName);
    const target = this._target();

    if (!submittedCard || !target) {
      console.error('Invalid guess or target not ready');
      return;
    }

    this._guesses.update(prev => [{ card: submittedCard, isCorrect: submittedCard.name === target.name }, ...prev,]);
  }
}
