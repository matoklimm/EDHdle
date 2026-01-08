import { Component, computed, Input } from '@angular/core';

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
  @Input({ required: true }) imgUrl!: String;

  artCropUrl = computed(() =>
    this.imgUrl.replace('/normal/front/', '/art_crop/front/')
  );
}
