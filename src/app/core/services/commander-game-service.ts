import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { dailyIndex } from './daily-random';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

import { GameService } from './game-service';
import { Card } from '@core/models/card';
import { Guess } from '@core/models/guess';

@Injectable({
  providedIn: 'root',
})
export class CommanderGameService implements GameService {
  private http = inject(HttpClient);

  guesses = signal<Guess[]>([]);
  suggestions = signal<Card[]>([]);

  cards = toSignal(this.http.get<Card[]>('commanders.json'), { initialValue: [] });

  target: Signal<Card> = computed(() => {
    const allCards = this.cards();
    if (allCards.length === 0) {
      console.error('Not having a length on all cards, therefore cant select a target');
    }
    return allCards[dailyIndex(allCards.length)];
  });


  submitGuess(cardName: string): void {
    const submittedCard = this.cards().find(card => card.name === cardName);
    if (!submittedCard || !this.target()) {
      // FIXME: proper error handling, maybe with a toast ?
      console.error('Submitted card not found or target not set.');
      return;
    }

    const isCorrect = submittedCard.name === this.target()!.name;
    this.guesses.update(prev => [...prev, { card: submittedCard, isCorrect }]);
  }


}
