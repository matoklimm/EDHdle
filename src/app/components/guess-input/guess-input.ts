import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { Card } from '@core/models/card';

@Component({
  selector: 'app-guess-input',
  imports: [],
  templateUrl: './guess-input.html',
  styleUrl: './guess-input.css',
})
export class GuessInput {
  @Input({ required: true }) allCards!: Card[];
  @Input({ required: true }) guessedNames!: string[];
  @Input({ required: true }) isGameWon!: boolean;

  @Output() select = new EventEmitter<Card>();

  query = signal('');

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return [];

    return this.allCards
      .filter(c =>
        c.name.toLowerCase().startsWith(q) &&
        !this.guessedNames.includes(c.name)
      )
  });

  choose(card: Card) {
    this.query.set('');
    this.select.emit(card);
  }
}
