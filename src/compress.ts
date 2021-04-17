import { join } from "path";
import { autoGenDir, fsRmDir } from "./file_handler";
import { CompressArgsType, OutImageType } from "./types";
// const sharp = require("sharp");
import sharp from "sharp";

export const compress = async ({
  path,
  width,
  height,
  maxFileSizeInKB = 600,
  format,
  quality = 100,
  outputPath,
}: CompressArgsType) => {
  const dirPath = outputPath
    ? join(outputPath, "output")
    : join("output", path.separator);

  try {
    await autoGenDir(dirPath);

    const resized = await sharp(path.basePath)
      .resize(width, height)
      .toFormat(format, { quality });

    const bufferResize = await resized.toBuffer({ resolveWithObject: true });

    const toKBsize = (size: number) => size / 1080;

    if (toKBsize(bufferResize.info.size) <= maxFileSizeInKB) {
      const result = await resized.toFile(
        join(dirPath, path.name + "." + format)
      );

      return;
    }

    compress({
      format,
      maxFileSizeInKB,
      path,
      width,
      height,
      quality: quality - 5,
    });
  } catch (error) {
    await fsRmDir(dirPath);
    console.log(error);
  }
};
