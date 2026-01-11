import { Component, computed, effect, inject, signal } from '@angular/core';
import { GuessInput } from '@app/components/guess-input/guess-input';
import { Victory } from '@app/components/victory/victory';
import { stripCardNameFromOracle } from '@app/shared/oracle-helper';
import { HintConfig } from '@core/models/hint-config';
import { CardGameService } from '@core/services/card-game-service';
import { GuessHint } from "@app/components/guess-hint/guess-hint";
import { GameShell } from "@app/components/game-shell/game-shell";
import { GuessHistorySmall } from "@app/components/guess-history-small/guess-history-small";

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.html',
  styleUrl: './card-game.css',
  imports: [GuessInput, Victory, GuessHint, GameShell, GuessHistorySmall],
})
export class CardGameComponent {
  readonly service = inject(CardGameService);

  readonly target = this.service.target;
  readonly yesterdayTarget = this.service.yesterdayTarget;
  readonly guesses = this.service.guesses;
  readonly isGameWon = this.service.isGameWon;

  hintConfig: HintConfig[] = [
    { level: 3, type: 'cmc' },
    { level: 5, type: 'colors' },
    { level: 7, type: 'oracle' },
  ];

  showVictory = signal(false);
  showHints = signal(false);
  forceMaxBlur = signal(false);

  private readonly MAX_BLUR = 21;
  private readonly MIN_BLUR = 6;
  private readonly STEP = 3;

  constructor() {
    effect(() => {
      if (this.isGameWon()) {
        setTimeout(() => {
          this.showVictory.set(true);
          console.log(this.showVictory());
        }, 1000);
      }
    });
  }

  readonly wrongGuesses = computed(() =>
    this.guesses().filter(g => !g.isCorrect).length
  );

  toggleHints(): void {
    this.showHints.update(v => !v);
  }

  readonly oracleHintHtml = computed(() => {
    const card = this.target();
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

  readonly blurAmount = computed(() => {
    if (this.isGameWon()) return 0;
    if (this.forceMaxBlur()) return this.MAX_BLUR;

    const blur = this.MAX_BLUR - this.wrongGuesses() * this.STEP;
    return Math.max(blur, this.MIN_BLUR);
  });

  toggleBlur(): void {
    this.forceMaxBlur.update(v => !v);
  }

}