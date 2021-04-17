export type CLIConfig = {
  imagesFolder: string;
  outputImagesFolder: string;
  selectedPreset: string;
  usePreset: boolean;
};

export type FormatType =
  | "avif"
  | "dz"
  | "fits"
  | "gif"
  | "heif"
  | "input"
  | "jpeg"
  | "magick"
  | "openslide"
  | "pdf"
  | "png"
  | "ppm"
  | "raw"
  | "svg"
  | "tiff"
  | "v"
  | "webp";

export type OutImageType = {
  basePath: string;
  name: string;
  separator: string;
};

export type CompressArgsType = {
  path: OutImageType;
  width: number;
  height?: number;
  maxFileSizeInKB?: number;
  format: FormatType;
  quality?: number;
  outputPath?: string;
};

export type QuestionReturnType<T> = Promise<{
  error?: string;
  value?: T;
}>;

export type QuestionType<T> = (config: CLIConfig) => QuestionReturnType<T>;
