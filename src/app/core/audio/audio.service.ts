import { Injectable, signal } from '@angular/core';
import { MAIN_THEME } from '@core/assets/asset-manifest';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private musicAudio?: HTMLAudioElement;

  readonly musicEnabled = signal(false);
  readonly musicVolume = signal(0.45);

  async playMainTheme(): Promise<void> {
    if (!this.musicAudio) {
      this.musicAudio = new Audio(MAIN_THEME);
      this.musicAudio.loop = true;
      this.musicAudio.volume = this.musicVolume();
    }

    try {
      await this.musicAudio.play();
      this.musicEnabled.set(true);
    } catch {
      this.musicEnabled.set(false);
      console.warn('Browser blocked autoplay. User interaction is required.');
    }
  }

  pauseMusic(): void {
    if (!this.musicAudio) return;

    this.musicAudio.pause();
    this.musicEnabled.set(false);
  }

  stopMusic(): void {
    if (!this.musicAudio) return;

    this.musicAudio.pause();
    this.musicAudio.currentTime = 0;
    this.musicEnabled.set(false);
  }

  setMusicVolume(volume: number): void {
    const safeVolume = Math.max(0, Math.min(1, volume));

    this.musicVolume.set(safeVolume);

    if (this.musicAudio) {
      this.musicAudio.volume = safeVolume;
    }
  }

  toggleMusic(): void {
    if (this.musicEnabled()) {
      this.pauseMusic();
      return;
    }
    void this.playMainTheme();
  }
}
