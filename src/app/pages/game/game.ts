import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuessHistory } from '@app/components/guess-history/guess-history';
import { GuessInput } from '@app/components/guess-input/guess-input';
import { Victory } from '@app/components/victory/victory';
import { Card } from '@core/models/card';
import { GameService } from '@core/services/game-service';
import { GAME_SERVICE } from '@core/services/game.token';
import { GameShell } from "@app/components/game-shell/game-shell";

@Component({
  selector: 'app-game',
  imports: [GuessHistory, GuessInput, Victory, RouterModule, GameShell],
  templateUrl: './game.html'
})
export class Game {
  service = inject<GameService>(GAME_SERVICE);

  readonly guesses = this.service.guesses;
  readonly target = this.service.target;
  readonly allCards = this.service.cards;
  readonly isGameWon = this.service.isGameWon;
  readonly guessedNames = this.service.guessedNames;
  readonly yesterdayTarget = this.service.yesterdayTarget;

  showVictory = signal(false);

  readyTarget = computed<Card | null>(() => this.target());

  constructor() {
    effect(() => {
      if (this.isGameWon()) {
        setTimeout(() => {
          this.showVictory.set(true);
        }, 1000);
      }
    });
  }

  submitGuess(card: Card) {
    this.service.submitGuess(card.name);
  }
}
