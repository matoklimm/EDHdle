import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-guess-cell-tags',
  imports: [],
  templateUrl: './guess-cell-tags.html',
  styleUrl: './guess-cell-tags.css',
})
export class GuessCellTags {
  @Input({ required: true }) values!: string[];
  @Input({ required: true }) targetValues!: string[];

  readonly correctCount = computed(() =>
    this.values.filter(v => this.targetValues.includes(v)).length
  );

  readonly isExact = computed(() =>
    this.correctCount() === this.values.length &&
    this.values.length === this.targetValues.length
  );

  readonly isAllWrong = computed(() =>
    this.correctCount() === 0 && this.targetValues.length > 0
  );

  readonly isPartial = computed(() =>
    !this.isExact() && !this.isAllWrong()
  );

  isCorrect(value: string): boolean {
    return this.targetValues.includes(value);
  }
}
