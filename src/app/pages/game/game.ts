import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuessHistory } from '@app/components/guess-history/guess-history';
import { GuessInput } from '@app/components/guess-input/guess-input';
import { Victory } from '@app/components/victory/victory';
import { Card } from '@core/models/card';
import { GameService } from '@core/services/game-service';
import { GAME_SERVICE } from '@core/services/game.token';

@Component({
  selector: 'app-game',
  imports: [GuessHistory, GuessInput, Victory, RouterModule],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  private game = inject<GameService>(GAME_SERVICE);

  guesses = this.game.guesses;
  target = this.game.target;
  allCards = this.game.cards;
  isGameWon = this.game.isGameWon;
  guessedNames = this.game.guessedNames;

  showVictory = signal(false);

  readyTarget = computed<Card | null>(() => this.target());

  submitGuess(card: Card) {
    this.game.submitGuess(card.name);

    if (this.isGameWon()) {
      setTimeout(() => this.showVictory.set(true), 1000);
    }
  }
}
