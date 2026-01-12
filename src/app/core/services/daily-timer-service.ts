import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DailyTimerService {
  private now = signal(Date.now());

  constructor() {
    setInterval(() => {
      this.now.set(Date.now());
    }, 1000);
  }

  readonly timeUntilReset = computed(() => {
    const now = new Date(this.now());

    const nextUtcMidnight = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0, 0, 0
    ));

    const diff = nextUtcMidnight.getTime() - now.getTime();

    const hours = Math.floor(diff / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);

    return { hours, minutes, seconds };
  });
}
