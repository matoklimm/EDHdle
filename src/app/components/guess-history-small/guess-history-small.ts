import { Component, computed, input } from '@angular/core';
import { required } from '@angular/forms/signals';
import { toArtCrop } from '@app/shared/image-helper';
import { Card } from '@core/models/card';

@Component({
  selector: 'app-guess-history-small',
  templateUrl: './guess-history-small.html',
  styleUrl: './guess-history-small.css',
})
export class GuessHistorySmall {
  readonly guesses = input.required<Card[]>();
  readonly target = input.required<Card | null>();

  cropImage(imgUrl: string): string {
    return toArtCrop(imgUrl);
  }

  readonly visibleGuesses = computed(() =>
    this.guesses().slice(0, 6)
  );

  readonly hasOverflow = computed(() =>
    this.guesses().length > 5
  );

  isCorrect(card: Card): boolean {
    const target = this.target();
    return !!target && card.name === target.name;
  }
}