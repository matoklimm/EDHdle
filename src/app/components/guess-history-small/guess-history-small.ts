import { Component, computed, input } from '@angular/core';
import { toArtCrop } from '@app/shared/image-helper';
import { Guess } from '@core/models/guess';

@Component({
  selector: 'app-guess-history-small',
  templateUrl: './guess-history-small.html',
  styleUrl: './guess-history-small.css',
})
export class GuessHistorySmall {
  readonly guesses = input.required<Guess[]>();

  cropImage(imgUrl: string): string {
    return toArtCrop(imgUrl);
  }

  readonly visibleGuesses = computed(() =>
    this.guesses().slice(0, 6)
  );

  readonly hasOverflow = computed(() =>
    this.guesses().length > 5
  );
}