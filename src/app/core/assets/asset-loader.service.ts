import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AssetLoaderService {
  preloadImages(urls: string[]): Promise<void> {
    const tasks = urls.map(url => this.loadImage(url));
    return Promise.all(tasks).then(() => undefined);
  }

  preloadAudio(urls: string[]): Promise<void> {
    const tasks = urls.map(url => this.loadAudio(url));
    return Promise.all(tasks).then(() => undefined);
  }

  private loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      image.src = url;
    })
  }

  private loadAudio(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => resolve();
      audio.onerror = () => {
        console.warn(`Failed to load audio: ${url}`);
        resolve();
      };
      audio.src = url;
      audio.load();
    });
  }
}