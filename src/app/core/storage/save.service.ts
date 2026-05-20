import { Injectable } from '@angular/core';
import { AudioSettings, SaveMetadata } from './save.types';

const SAVE_KEY = 'balatro-angular-clone.save';
const SETTINGS_KEY = 'balatro-angular-clone.settings';
const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  musicEnabled: false,
  musicVolume: 0.45,
};

@Injectable({
  providedIn: 'root',
})
export class SaveService {
  getSaveMetadata(): SaveMetadata {
    const raw = localStorage.getItem(SAVE_KEY);

    if (!raw) {
      return { exists: false };
    }

    try {
      const parsed = JSON.parse(raw) as {
        version?: number;
        savedAt?: string;
      };

      return {
        exists: true,
        version: parsed.version,
        savedAt: parsed.savedAt,
      };
    } catch {
      return { exists: false };
    }
  }

  hasSave(): boolean {
    return this.getSaveMetadata().exists;
  }

  getAudioSettings(): AudioSettings {
    const raw = localStorage.getItem(SETTINGS_KEY);

    if (!raw) {
      return DEFAULT_AUDIO_SETTINGS;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<AudioSettings>;
      const musicEnabled = Boolean(parsed.musicEnabled);
      const volumeValue =
        typeof parsed.musicVolume === 'number'
          ? parsed.musicVolume
          : DEFAULT_AUDIO_SETTINGS.musicVolume;

      return {
        musicEnabled,
        musicVolume: this.clampVolume(volumeValue),
      };
    } catch {
      return DEFAULT_AUDIO_SETTINGS;
    }
  }

  saveAudioSettings(settings: AudioSettings): void {
    const safeSettings: AudioSettings = {
      musicEnabled: settings.musicEnabled,
      musicVolume: this.clampVolume(settings.musicVolume),
    };

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(safeSettings));
  }

  private clampVolume(volume: number): number {
    return Math.max(0, Math.min(1, volume));
  }
}
