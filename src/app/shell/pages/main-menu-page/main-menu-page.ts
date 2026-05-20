import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SaveService } from '@core/storage/save.service';
import { AudioService } from '@core/audio/audio.service';

@Component({
  selector: 'app-main-menu-page',
  imports: [],
  templateUrl: './main-menu-page.html',
  styleUrl: './main-menu-page.css',
})
export class MainMenuPage {
  private readonly router = inject(Router);
  private readonly saveService = inject(SaveService);

  readonly audioService = inject(AudioService);
}
