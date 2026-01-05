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


  readonly isExactMatch = computed(() => {
    if (!this.colors || !this.targetColors) return false;

    return (
      this.colors.length === this.targetColors.length &&
      this.colors.every(c => this.targetColors.includes(c))
    );
  });

  readonly isSuperset = computed(() => {
    if (!this.colors || !this.targetColors) return false;

    return (
      this.targetColors.every(c => this.colors.includes(c)) &&
      this.colors.length > this.targetColors.length
    );
  });

  readonly isAllWrong = computed(() => {
    if (!this.colors || !this.targetColors) return false;

    return this.colors.every(c => !this.targetColors.includes(c));
  });

  isCorrectColor(color: string): boolean {
    return this.targetColors.includes(color);
  }

  getSvgPath(color: string): string {
    return `/mana/${color.toUpperCase()}.svg`;
  }
}
