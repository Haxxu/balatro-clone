export type PreloadStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';

export type PreloadStepId =
  | 'settings'
  | 'save'
  | 'images';

export type PreloadStep = {
  id: PreloadStepId;
  label: string;
  progressWeight: number;
};

export type PreloadState = {
  status: PreloadStatus;
  currentStepLabel: string;
  progress: number;
  errorMessage?: string;
};
