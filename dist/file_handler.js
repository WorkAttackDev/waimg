"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesPath = exports.autoGenDir = exports.fsRmDir = void 0;
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const constants_1 = require("./constants");
// convert to promises
const fsLstat = util_1.promisify(fs_1.lstat);
const fsReadDir = util_1.promisify(fs_1.readdir);
const fsMkDir = util_1.promisify(fs_1.mkdir);
exports.fsRmDir = util_1.promisify(fs_1.rmdir);
const autoGenDir = (path) => __awaiter(void 0, void 0, void 0, function* () {
    if (fs_1.existsSync(path))
        return;
    yield fsMkDir(path, { recursive: true });
});
exports.autoGenDir = autoGenDir;
const isOutputFolder = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const isDirectory = yield (yield fsLstat(path_1.join(path))).isDirectory();
    if (isDirectory && path.endsWith("\\output"))
        return true;
    return false;
});
const getFilesPath = ({ path, fileCount = 0, suffix = "", }) => __awaiter(void 0, void 0, void 0, function* () {
    let arr = [];
    const isDirectory = yield (yield fsLstat(path_1.join(path))).isDirectory();
    if (isDirectory) {
        const dir = yield fsReadDir(path);
        for (let i = 0; i < dir.length; i++) {
            const isOF = yield isOutputFolder(path_1.join(path, dir[i]));
            if (isOF)
                continue;
            arr = arr.concat(yield exports.getFilesPath({
                path: path_1.join(path, dir[i]),
                fileCount: i,
                suffix: suffix,
            }));
        }
        return arr;
    }
    if (!constants_1.IMG_FORMATS.some((_iformat) => path.endsWith(_iformat)))
        return arr;
    arr.push({
        basePath: path,
        name: fileCount >= 10 ? fileCount + suffix : "0" + fileCount + suffix,
        separator: path_1.basename(path_1.dirname(path)),
    });
    return arr;
});
exports.getFilesPath = getFilesPath;
//# sourceMappingURL=file_handler.js.map