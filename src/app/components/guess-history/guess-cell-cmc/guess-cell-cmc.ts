import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-guess-cell-cmc',
  imports: [],
  templateUrl: './guess-cell-cmc.html',
  styleUrl: './guess-cell-cmc.css',
})
export class GuessCellCmc {
  @Input({ required: true }) value!: number;
  @Input({ required: true }) targetValue!: number;

  readonly isCorrect = computed(() => this.value === this.targetValue);

  readonly direction = computed<'up' | 'down' | null>(() => {
    if (this.isCorrect()) return null;
    return this.targetValue > this.value ? 'up' : 'down';
  });
}
