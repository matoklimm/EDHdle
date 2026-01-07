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
  displayValue = signal('');
  activeIndex = signal(-1);

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return [];

    return this.allCards
      .filter(c =>
        c.name.toLowerCase().startsWith(q) &&
        !this.guessedNames.includes(c.name)
      )
  });

  onInput(value: string) {
    this.query.set(value);
    this.displayValue.set(value);
    this.activeIndex.set(-1);
  }

  onKeyDown(event: KeyboardEvent) {
    const list = this.filtered();
    if (!list.length) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update(i =>
          i < list.length - 1 ? i + 1 : 0
        );
        this.updateDisplay();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update(i =>
          i > 0 ? i - 1 : list.length - 1
        );
        this.updateDisplay();
        break;

      case 'Enter':
        if (this.activeIndex() >= 0) {
          event.preventDefault();
          this.choose(list[this.activeIndex()]);
        }
        break;

      case 'Escape':
        this.clear();
        break;
    }
  }

  updateDisplay() {
    const i = this.activeIndex();
    const list = this.filtered();
    if (i >= 0 && list[i]) {
      this.displayValue.set(list[i].name);
    }
  }

  choose(card: Card) {
    this.query.set('');
    this.displayValue.set('');
    this.activeIndex.set(-1);
    this.select.emit(card);
  }

  clear() {
    this.query.set('');
    this.displayValue.set('');
    this.activeIndex.set(-1);
  }

}
