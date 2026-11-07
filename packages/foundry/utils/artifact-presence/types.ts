export interface ArtifactPresenceVerificationResult {
  isValid: boolean;
  errors: string[];
}

export interface ArtifactPresenceConfig {
  expectedFiles: string[];
  baseDir?: string;
}
