import { Component, computed, inject } from '@angular/core';
import { DailyTimerService } from '@core/services/daily-timer-service';

@Component({
  selector: 'app-next-puzzle-display',
  imports: [],
  templateUrl: './next-puzzle-display.html',
  styleUrl: './next-puzzle-display.css',
})
export class NextPuzzleDisplay {
  private timerService = inject(DailyTimerService);

  readonly resetLabel = computed(() => {
    const { hours, minutes, seconds } = this.timerService.timeUntilReset();

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  });
}
