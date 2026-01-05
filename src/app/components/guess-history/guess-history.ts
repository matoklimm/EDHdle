import { Component, computed, inject, Input } from '@angular/core';
import { Guess } from '@core/models/guess';
import { Card } from '@core/models/card';
import { GuessCellArtwork } from './guess-cell-artwork/guess-cell-artwork';
import { GuessCellColors } from "./guess-cell-colors/guess-cell-colors";
import { GuessCellCmc } from "./guess-cell-cmc/guess-cell-cmc";

@Component({
  selector: 'app-guess-history',
  imports: [GuessCellArtwork, GuessCellColors, GuessCellCmc],
  templateUrl: './guess-history.html',
  styleUrl: './guess-history.css',
})
export class GuessHistory {
  @Input({ required: true }) guesses!: Guess[]
  @Input({ required: true }) target!: Card
}
