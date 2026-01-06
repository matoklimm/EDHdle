import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Card } from '@core/models/card';

@Component({
  selector: 'app-victory',
  imports: [RouterModule],
  templateUrl: './victory.html',
  styleUrl: './victory.css',
})
export class Victory {
  @Input({ required: true }) target!: Card;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) { }

  get isCommander(): boolean {
    return this.router.url.startsWith('/commander');
  }

  get targetLink(): string {
    return this.isCommander ? '/staple' : '/commander';
  }

  get targetLabel(): string {
    return this.isCommander
      ? '🃏 Staple Mode'
      : '👑 Commander Mode';
  }
}

