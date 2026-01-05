import { Component, computed, inject, Signal } from '@angular/core';
import { CommanderGameService } from '@core/services/commander-game-service';
import { GuessHistory } from "@app/components/guess-history/guess-history";
import { Card } from '@core/models/card';
import { GuessInput } from "@app/components/guess-input/guess-input";

@Component({
  selector: 'app-commander',
  imports: [GuessHistory, GuessInput],
  templateUrl: './commander.html',
  styles: `
  .page {
    display: flex;
    justify-content: center;
  }

  .content {
    max-width: 1100px;
    width: 100%;
    padding: 40px 32px;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.15),
      rgba(0,0,0,0.05)
    );
  border-radius: 12px;
  }
  `,
})
export class Commander {
  private service = inject(CommanderGameService)
  guesses = this.service.guesses
  target = this.service.target
  allCards = this.service.cards

  guessedNames: Signal<string[]> = computed(() => {
    return this.guesses().map(guess => guess.card.name)
  });

  submitGuess(guess: Card) {
    this.service.submitGuess(guess.name);
  }


  constructor() {
    setTimeout(() => {
      this.service.submitGuess('Atraxa, Praetors\' Voice');
      console.log(this.service.guesses());
    }, 1500);

    setTimeout(() => {
      this.service.submitGuess('Giada, Font of Hope');
    }, 2500);

    setTimeout(() => {
      this.service.submitGuess('Baylen, the Haymaker');
    }, 3500);

    setTimeout(() => {
      this.service.submitGuess('Hakbal of the Surging Soul');
    }, 4500);

    setTimeout(() => {
      this.service.submitGuess('Kenrith, the Returned King');
    }, 6500);
  }
}
