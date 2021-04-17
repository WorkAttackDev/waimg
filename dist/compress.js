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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compress = void 0;
const path_1 = require("path");
const file_handler_1 = require("./file_handler");
// const sharp = require("sharp");
const sharp_1 = __importDefault(require("sharp"));
const compress = ({ path, width, height, maxFileSizeInKB = 600, format, quality = 100, outputPath, }) => __awaiter(void 0, void 0, void 0, function* () {
    const dirPath = outputPath
        ? path_1.join(outputPath, "output")
        : path_1.join("output", path.separator);
    try {
        yield file_handler_1.autoGenDir(dirPath);
        const resized = yield sharp_1.default(path.basePath)
            .resize(width, height)
            .toFormat(format, { quality });
        const bufferResize = yield resized.toBuffer({ resolveWithObject: true });
        const toKBsize = (size) => size / 1080;
        if (toKBsize(bufferResize.info.size) <= maxFileSizeInKB) {
            const result = yield resized.toFile(path_1.join(dirPath, path.name + "." + format));
            return;
        }
        exports.compress({
            format,
            maxFileSizeInKB,
            path,
            width,
            height,
            quality: quality - 5,
        });
    }
    catch (error) {
        yield file_handler_1.fsRmDir(dirPath);
        console.log(error);
    }
});
exports.compress = compress;
//# sourceMappingURL=compress.js.map