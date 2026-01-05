import { Injectable, signal, Signal } from '@angular/core';
import { GameService } from './game-service';
import { Card } from '../models/card';
import { Guess } from '../models/guess';

@Injectable({
  providedIn: 'root',
})
export class StapleGameService implements GameService {
  guesses = signal([]);
  suggestions = signal([]);

  constructor() {
    console.log("This is the staple game");
  }


  submitGuess(cardName: string): void {
    throw new Error('Method not implemented.');
  }

}
