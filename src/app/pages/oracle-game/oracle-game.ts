import { Component, computed, effect, inject, signal } from '@angular/core';
import { GuessHint } from '@app/components/guess-hint/guess-hint';
import { GuessInput } from '@app/components/guess-input/guess-input';
import { Victory } from '@app/components/victory/victory';
import { stripCardNameFromOracle } from '@app/shared/oracle-helper';
import { HintConfig } from '@core/models/hint-config';
import { OracleGameService } from '@core/services/oracle-game-service';
import { GuessHistorySmall } from "@app/components/guess-history-small/guess-history-small";
import { GameShell } from "@app/components/game-shell/game-shell";
import { NextPuzzleDisplay } from "@app/components/next-puzzle-display/next-puzzle-display";
import { BasePage } from '@app/pages/base-page';

@Component({
  selector: 'app-oracle-game',
  templateUrl: './oracle-game.html',
  styleUrl: './oracle-game.css',
  imports: [GuessInput, GuessHint, Victory, GuessHistorySmall, GameShell, NextPuzzleDisplay],
})
export class OracleGameComponent extends BasePage {
  readonly service = inject(OracleGameService);

  readonly target = this.service.target;
  readonly yesterdayTarget = this.service.yesterdayTarget;
  readonly guesses = this.service.guesses;
  readonly isGameWon = this.service.isGameWon;
  readonly wrongGuesses = this.service.wrongGuesses;

  showHints = signal(false);
  showVictory = signal(false);

  hintConfig: HintConfig[] = [
    { level: 3, type: 'cmc' },
    { level: 5, type: 'colors' },
    { level: 7, type: 'artwork' },
  ];


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

  toggleHints(): void {
    this.showHints.update(v => !v);
  }

  constructor() {
    super();

    effect(() => {
      if (this.isGameWon()) {
        setTimeout(() => this.showVictory.set(true), 1000);
      }
    });
  }
}