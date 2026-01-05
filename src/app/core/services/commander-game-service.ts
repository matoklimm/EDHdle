import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { GameService } from './game-service';
import { Card } from '../models/card';
import { Guess } from '../models/guess';
import { AssetLoaderService } from './asset-loader-service';
import { dailyIndex } from './daily-random';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CommanderGameService implements GameService {
  private http = inject(HttpClient);

  guesses = signal<Guess[]>([]);
  suggestions = signal<Card[]>([]);

  cards = toSignal(this.http.get<Card[]>('commanders.json'), { initialValue: [] });
  private target = computed(() => {
    const allCards = this.cards();
    if (allCards.length === 0) return null;
    return allCards[dailyIndex(allCards.length)];
  });


  constructor() {
    //this.cards();
    setTimeout(() => console.log('Cards geladen:', this.cards()), 500);
    setTimeout(() => console.log('Cards geladen:', this.target()), 500);
  }

  submitGuess(cardName: string): void {
    const submittedCard = this.cards().find(card => card.name === cardName);
    console.log('Submitted card:', submittedCard);
    if (!submittedCard || !this.target()) {
      // FIXME: proper error handling, maybe with a toast ?
      console.error('Submitted card not found or target not set.');
      return;
    }

    const isCorrect = submittedCard.name === this.target()!.name;
    this.guesses.update(prev => [...prev, { card: submittedCard, isCorrect }]);
  }


}
