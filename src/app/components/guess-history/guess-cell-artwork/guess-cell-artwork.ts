import { Component, computed, Input } from '@angular/core';
import { toArtCrop } from '@shared/image-helper';

@Component({
  selector: 'app-guess-cell-artwork',
  imports: [],
  styleUrl: './guess-cell-artwork.css',
  template: `
    <div class="artwork">
      <img
        [src]="artCropUrl()"
        alt="Commander artwork"
        class="artwork-image">
    </div>
  `
})
export class GuessCellArtwork {
  @Input({ required: true }) imgUrl!: string;

  artCropUrl = computed(() =>
    toArtCrop(this.imgUrl)
  );
}
