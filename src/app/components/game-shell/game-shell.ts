import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-shell',
  imports: [],
  templateUrl: './game-shell.html',
  styleUrl: './game-shell.css',
})
export class GameShell {
  @Input({ required: true }) contentSize: 'normal' | 'wide' = 'normal';
}
