export type SaveMetadata = {
  exists: boolean;
  version?: number;
  savedAt?: string;
};

export type AudioSettings = {
  musicEnabled: boolean;
  musicVolume: number;
};
