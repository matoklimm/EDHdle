import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-guess-cell-colors',
  imports: [],
  templateUrl: './guess-cell-colors.html',
  styleUrl: './guess-cell-colors.css',
})
export class GuessCellColors {
  @Input({ required: true }) colors!: string[];
  @Input({ required: true }) targetColors!: string[];


  readonly correctCount = computed(() =>
    this.colors.filter(c => this.targetColors.includes(c)).length
  );

  readonly isExact = computed(() =>
    this.correctCount() === this.targetColors.length &&
    this.colors.length === this.targetColors.length
  );

  readonly isPartial = computed(() =>
    this.correctCount() > 0 && !this.isExact()
  );

  readonly isAllWrong = computed(() =>
    this.correctCount() === 0
  );

  isCorrectColor(color: string): boolean {
    return this.targetColors.includes(color);
  }

  getSvgPath(color: string): string {
    return `/mana/${color.toUpperCase()}.svg`;
  }
}
