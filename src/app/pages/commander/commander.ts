import { Component, computed, inject, signal, Signal, effect } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommanderGameService } from '@core/services/commander-game-service';
import { GuessHistory } from "@app/components/guess-history/guess-history";
import { Card } from '@core/models/card';
import { GuessInput } from "@app/components/guess-input/guess-input";
import { Victory } from "@app/components/victory/victory";

@Component({
  selector: 'app-commander',
  imports: [GuessHistory, GuessInput, Victory, RouterModule],
  templateUrl: './commander.html',
  styleUrl: './commander.css',
})
export class Commander {
  private service = inject(CommanderGameService)
  guesses = this.service.guesses
  target = this.service.target
  allCards = this.service.cards

  showVictory = signal(false);

  isGameWon: Signal<boolean> = computed(() => {
    return this.guesses().find(g => g.isCorrect)?.isCorrect ? true : false
  });

  guessedNames: Signal<string[]> = computed(() => {
    return this.guesses().map(guess => guess.card.name)
  });

  submitGuess(guess: Card) {
    if (this.isGameWon()) {
      this.showVictory.set(true);
      return;
    }

    this.service.submitGuess(guess.name);
  }

  constructor() {
    effect(() => {
      if (this.isGameWon()) {
        setTimeout(() => {
          this.showVictory.set(true);
        }, 1000);
      }
    });
  }
}
