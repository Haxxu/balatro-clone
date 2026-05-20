import { computed, inject, Injectable, signal } from "@angular/core";
import { PreloadState, PreloadStep } from "./preload.type";
import { AssetLoaderService } from "@core/assets/asset-loader.service";
import { SaveService } from "@core/storage/save.service";
import { AUDIO_ASSETS, IMAGE_ASSETS } from "@core/assets/asset-manifest";

@Injectable({
  providedIn: 'root',
})
export class PreloadService {
  private readonly _state = signal<PreloadState>({
    status: 'idle',
    currentStepLabel: 'Waiting...',
    progress: 0,
  })

  readonly state = this._state.asReadonly();

  readonly isLoading = computed(() => this._state().status === 'loading');
  readonly isSuccess = computed(() => this._state().status === 'success');
  readonly isError = computed(() => this._state().status === 'error');

  private readonly steps: PreloadStep[] = [
    {
      id: 'settings',
      label: 'Loading settings...',
      progressWeight: 10,
    },
    {
      id: 'save',
      label: 'Checking save data...',
      progressWeight: 15,
    },
    {
      id: 'images',
      label: 'Loading card textures...',
      progressWeight: 55,
    },
    {
      id: 'audio',
      label: 'Loading sounds...',
      progressWeight: 20,
    }
  ];

  private readonly assetLoader = inject(AssetLoaderService);
  private readonly saveService = inject(SaveService);

  async preload(): Promise<void> {
    this._state.set({
      status: 'loading',
      currentStepLabel: 'Starting...',
      progress: 0,
    });

    try {
      let completedWeight = 0;
      const totalWeight = this.steps.reduce((sum, step) => sum + step.progressWeight, 0);

      for (const step of this.steps) {
        this.setCurrentStep(step, completedWeight, totalWeight);

        await this.runStep(step.id);

        completedWeight += step.progressWeight;
        this.setProgress(completedWeight, totalWeight, step.label);
      }

      this._state.set({
        status: 'success',
        currentStepLabel: 'Ready!',
        progress: 100,
      });
    } catch (error) {
      this._state.set({
        status: 'error',
        currentStepLabel: 'Failed to load',
        progress: 0,
        errorMessage: error instanceof Error ? error.message : 'Unknown preload error',
      })
    }
  }

  private setCurrentStep(step: PreloadStep, completedWeight: number, totalWeight: number): void {
    this._state.set({
      status: 'loading',
      currentStepLabel: step.label,
      progress: Math.round((completedWeight / totalWeight) * 100),
    })
  }

  private async runStep(stepId: string): Promise<void> {
    switch (stepId) {
      case 'settings':
        await this.fakeSmallDelay();
        return;
      
      case 'save':
        this.saveService.getSaveMetaData();
        await this.fakeSmallDelay();
        return;
      
      case 'images':
        await this.assetLoader.preloadImages(IMAGE_ASSETS);
        return;

      case 'audio':
        await this.assetLoader.preloadAudio(AUDIO_ASSETS);
        return;

      default:
        return;
    }
  }

  private setProgress(completedWeight: number, totalWeight: number, stepLabel: string): void {
    this._state.set({
      status: 'loading',
      currentStepLabel: stepLabel,
      progress: Math.round((completedWeight / totalWeight) * 100),
    });
  }

  private fakeSmallDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 250));
  }
}