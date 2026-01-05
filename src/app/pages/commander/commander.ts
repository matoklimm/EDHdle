import { Component, inject } from '@angular/core';
import { CommanderGameService } from '@core/services/commander-game-service';
import { GuessHistory } from "@app/components/guess-history/guess-history";

@Component({
  selector: 'app-commander',
  imports: [GuessHistory],
  template: `
  <div class="page">
    <div class="content">
      <app-guess-history [guesses]="guesses()" [target]="target()"></app-guess-history>
    </div>
  </div>
  `,
  styles: `
  .page {
    display: flex;
    justify-content: center;
  }

  .content {
    max-width: 1000px;
    width: 100%;
    padding: 32px 24px;
  }
  `,
})
export class Commander {
  private service = inject(CommanderGameService)
  guesses = this.service.guesses
  target = this.service.target


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
