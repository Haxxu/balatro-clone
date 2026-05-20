import { inject, Injectable, signal } from '@angular/core';
import { MAIN_THEME } from '@core/assets/asset-manifest';
import { SaveService } from '@core/storage/save.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private musicAudio?: HTMLAudioElement;
  private readonly saveService = inject(SaveService);

  readonly musicEnabled = signal(this.saveService.getAudioSettings().musicEnabled);
  readonly musicVolume = signal(this.saveService.getAudioSettings().musicVolume);

  async playMainTheme(): Promise<void> {
    if (!this.musicAudio) {
      this.musicAudio = new Audio(MAIN_THEME);
      this.musicAudio.loop = true;
      this.musicAudio.volume = this.musicVolume();
    }

    try {
      await this.musicAudio.play();
      this.musicEnabled.set(true);
      this.persistSettings();
    } catch {
      this.musicEnabled.set(false);
      this.persistSettings();
      console.warn('Browser blocked autoplay. User interaction is required.');
    }
  }

  pauseMusic(): void {
    if (!this.musicAudio) return;

    this.musicAudio.pause();
    this.musicEnabled.set(false);
    this.persistSettings();
  }

  stopMusic(): void {
    if (!this.musicAudio) return;

    this.musicAudio.pause();
    this.musicAudio.currentTime = 0;
    this.musicEnabled.set(false);
    this.persistSettings();
  }

  setMusicVolume(volume: number): void {
    const safeVolume = Math.max(0, Math.min(1, volume));

    this.musicVolume.set(safeVolume);

    if (this.musicAudio) {
      this.musicAudio.volume = safeVolume;
    }

    this.persistSettings();
  }

  toggleMusic(): void {
    if (this.musicEnabled()) {
      this.pauseMusic();
      return;
    }
    void this.playMainTheme();
  }

  private persistSettings(): void {
    this.saveService.saveAudioSettings({
      musicEnabled: this.musicEnabled(),
      musicVolume: this.musicVolume(),
    });
  }
}
