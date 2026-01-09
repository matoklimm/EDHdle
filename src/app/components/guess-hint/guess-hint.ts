import { Component, computed, Input } from '@angular/core';
import { toArtCrop } from '@app/shared/image-helper';
import { stripCardNameFromOracle } from '@app/shared/oracle-helper';
import { Card } from '@core/models/card';
import { HintConfig, HintLevel } from '@core/models/hint-config';

@Component({
  selector: 'app-guess-hint',
  imports: [],
  templateUrl: './guess-hint.html',
  styleUrl: './guess-hint.css',
})
export class GuessHint {
  @Input({ required: true }) target!: Card;
  @Input({ required: true }) wrongGuesses!: number;
  @Input({ required: true }) config!: HintConfig[];

  isVisible(level: HintLevel): boolean {
    return this.wrongGuesses >= level;
  }

  getHintsForLevel(level: HintLevel): HintConfig[] {
    return this.config.filter(h => h.level === level);
  }

  readonly oracleHintHtml = computed(() => {
    const card = this.target;
    if (!card) return '';

    const text = stripCardNameFromOracle(
      card.oracleText,
      card.name
    );

    return text.replaceAll(
      '[SEARCHED_CARD]',
      '<em class="oracle-placeholder">SEARCHED CARD</em>'
    );
  });

  artCropUrl = computed(() =>
    toArtCrop(this.target.imageUrl)
  );
}
