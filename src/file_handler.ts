import { lstat, readdir, mkdir, existsSync, rmdir } from "fs";
import { promisify } from "util";
import { join, basename, dirname } from "path";
import { OutImageType } from "./types";
import { IMG_FORMATS } from "./constants";

// convert to promises
const fsLstat = promisify(lstat);
const fsReadDir = promisify(readdir);
const fsMkDir = promisify(mkdir);

export const fsRmDir = promisify(rmdir);

export const autoGenDir = async (path: string) => {
  if (existsSync(path)) return;
  await fsMkDir(path, { recursive: true });
};

type GetFilesPathArgs = {
  path: string;
  fileCount?: number;
  suffix?: string;
};

const isOutputFolder = async (path: string) => {
  const isDirectory = await (await fsLstat(join(path))).isDirectory();
  if (isDirectory && path.endsWith("\\output")) return true;
  return false;
};

export const getFilesPath = async ({
  path,
  fileCount = 0,
  suffix = "",
}: GetFilesPathArgs) => {
  let arr: OutImageType[] = [];

  const isDirectory = await (await fsLstat(join(path))).isDirectory();

  if (isDirectory) {
    const dir = await fsReadDir(path);
    for (let i = 0; i < dir.length; i++) {
      const isOF = await isOutputFolder(join(path, dir[i]));

      if (isOF) continue;

      arr = arr.concat( 
        await getFilesPath({
          path: join(path, dir[i]),
          fileCount: i, 
          suffix: suffix,
        })
      );
    }

    return arr;
  }

  if (!IMG_FORMATS.some((_iformat) => path.endsWith(_iformat))) return arr;

  arr.push({
    basePath: path,
    name: fileCount >= 10 ? fileCount + suffix : "0" + fileCount + suffix,
    separator: basename(dirname(path)),
  });

  return arr;
};
