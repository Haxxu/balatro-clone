import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '@core/audio/audio.service';
import { SaveService } from '@core/storage/save.service';

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
  readonly hasSave = this.saveService.hasSave();

  async newRun(): Promise<void> {
    await this.router.navigateByUrl('/game');
  }

  async continueRun(): Promise<void> {
    if (!this.hasSave) {
      return;
    }

    await this.router.navigateByUrl('/game');
  }

  async enableMusic(): Promise<void> {
    await this.audioService.playMainTheme();
  }

  onMusicVolumeInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) {
      return;
    }

    this.audioService.setMusicVolume(Number(input.value));
  }
}
