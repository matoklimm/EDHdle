import { Component } from '@angular/core';
import { CommanderGameService } from '@core/services/commander-game-service';

@Component({
  selector: 'app-commander',
  imports: [],
  templateUrl: './commander.html',
  styleUrl: './commander.css',
})
export class Commander {


  constructor(private service: CommanderGameService) {
    setTimeout(() => {
      this.service.submitGuess('Atraxa, Praetors\' Voice');
      this.service.submitGuess('Chatterfang, Squirrel General');
      console.log(this.service.guesses());
    }, 1500);
  }
}
