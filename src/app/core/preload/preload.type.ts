export type PreloadStatus = 
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';

export type PreloadStep = {
  id: string;
  label: string;
  progressWeight: number;
};

export type PreloadState = {
  status: PreloadStatus;
  currentStepLabel: string;
  progress: number;
  errorMessage?: string;
}