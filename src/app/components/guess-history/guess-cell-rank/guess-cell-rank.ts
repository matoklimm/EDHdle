import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-guess-cell-rank',
  imports: [],
  templateUrl: './guess-cell-rank.html',
  styleUrl: './guess-cell-rank.css',
})
export class GuessCellRank {
  @Input({ required: true }) value!: number;
  @Input({ required: true }) targetValue!: number;

  readonly isCorrect = computed(() => this.value === this.targetValue);

  readonly direction = computed<'up' | 'down' | null>(() => {
    if (this.isCorrect()) return null;
    return this.targetValue > this.value ? 'down' : 'up';
  });

  readonly isWithinRange = computed<boolean>(() => {
    return Math.abs(this.value - this.targetValue) <= 20
  });
}
