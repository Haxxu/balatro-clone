import { Injectable } from '@angular/core';
import { SaveMetadata } from './save.types';

const SAVE_KEY = 'balatro-angular-clone.save';

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
}
