import { Component, computed, inject, Input } from '@angular/core';
import { Card } from '@core/models/card';
import { GuessCellArtwork } from './guess-cell-artwork/guess-cell-artwork';
import { GuessCellColors } from "./guess-cell-colors/guess-cell-colors";
import { GuessCellCmc } from "./guess-cell-cmc/guess-cell-cmc";
import { GuessCellTags } from "./guess-cell-tags/guess-cell-tags";
import { GuessCellRank } from "./guess-cell-rank/guess-cell-rank";

@Component({
  selector: 'app-guess-history',
  imports: [GuessCellArtwork, GuessCellColors, GuessCellCmc, GuessCellTags, GuessCellRank],
  templateUrl: './guess-history.html',
  styleUrl: './guess-history.css',
})
export class GuessHistory {
  @Input({ required: true }) guesses!: Card[]
  @Input({ required: true }) target!: Card
}
