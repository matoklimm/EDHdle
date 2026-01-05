import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guess-cell-artwork',
  imports: [],
  styleUrl: './guess-cell-artwork.css',
  template: `
    <div class="artwork">
      <img
        [src]="imgUrl"
        alt="Commander artwork"
        class="artwork-image">
    </div>
  `
})
export class GuessCellArtwork {
  @Input({ required: true }) imgUrl!: String;
}
