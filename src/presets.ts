import { compress } from "./compress";
import { getFilesPath } from "./file_handler";
import { CLIConfig } from "./types";

type PresetArgs = {
  config: CLIConfig;
  suffix?: string;
};

type PresetFunction = (args: PresetArgs) => Promise<void>;

// presets
export const toJpg1920: PresetFunction = async ({ config, suffix }) => {
  const paths = await getFilesPath({
    path: config.imagesFolder,
    suffix: suffix,
  });

  await Promise.all(
    paths.map(
      async (path) =>
        await compress({
          width: 1920,
          format: "jpeg",
          path,
          maxFileSizeInKB: 600,
          outputPath: config.outputImagesFolder,
        })
    )
  );
};

export const toJpg1080: PresetFunction = async ({ suffix, config }) => {
  const paths = await getFilesPath({
    path: config.imagesFolder,
    suffix: suffix,
  });

  await Promise.all(
    paths.map(
      async (path) =>
        await compress({
          width: 1080,
          format: "jpeg",
          path,
          maxFileSizeInKB: 500,
          outputPath: config.outputImagesFolder,
        })
    )
  );
};

export const toJpg720: PresetFunction = async ({ config, suffix }) => {
  const paths = await getFilesPath({
    path: config.imagesFolder,
    suffix: suffix,
  });

  await Promise.all(
    paths.map(
      async (path) =>
        await compress({
          width: 720,
          format: "jpeg",
          path,
          maxFileSizeInKB: 400,
          outputPath: config.outputImagesFolder,
        })
    )
  );
};

export const toJpg640: PresetFunction = async ({ config, suffix }) => {
  const paths = await getFilesPath({
    path: config.imagesFolder,
    suffix: suffix,
  });

  await Promise.all(
    paths.map(
      async (path) =>
        await compress({
          width: 640,
          format: "jpeg",
          path,
          maxFileSizeInKB: 300,
          outputPath: config.outputImagesFolder,
        })
    )
  );
};

export const toJpeg1080Square: PresetFunction = async ({ config, suffix }) => {
  const paths = await getFilesPath({
    path: config.imagesFolder,
    suffix: suffix,
  });

  await Promise.all(
    paths.map(
      async (path) =>
        await compress({
          format: "jpeg",
          path,
          width: 1080,
          height: 1080,
          outputPath: config.outputImagesFolder,
        })
    )
  );
};

export const toJpegWebSML: PresetFunction = async ({ config }) => {
  await toJpg1080({ config, suffix: "_lg" });
  await toJpg720({ config, suffix: "_md" });
  await toJpg640({ config, suffix: "_sm" });
}; 

export const presetsList = [
  { name: "para jpg 1920 largura", method: toJpg1920 },
  { name: "para jpg 1080 largura", method: toJpg1080 },
  { name: "para jpeg 1080 quadrado", method: toJpeg1080Square },
  { name: "para jpg 720  largura", method: toJpg720 },
  { name: "para jpg 640 largura", method: toJpg640 },
  { name: "para jpeg web (small, medium, large)", method: toJpegWebSML },
];
