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
exports.presetsList = exports.toJpegWebSML = exports.toJpeg1080Square = exports.toJpg640 = exports.toJpg720 = exports.toJpg1080 = exports.toJpg1920 = void 0;
const compress_1 = require("./compress");
const file_handler_1 = require("./file_handler");
// presets
const toJpg1920 = ({ config, suffix }) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = yield file_handler_1.getFilesPath({
        path: config.imagesFolder,
        suffix: suffix,
    });
    yield Promise.all(paths.map((path) => __awaiter(void 0, void 0, void 0, function* () {
        return yield compress_1.compress({
            width: 1920,
            format: "jpeg",
            path,
            maxFileSizeInKB: 600,
            outputPath: config.outputImagesFolder,
        });
    })));
});
exports.toJpg1920 = toJpg1920;
const toJpg1080 = ({ suffix, config }) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = yield file_handler_1.getFilesPath({
        path: config.imagesFolder,
        suffix: suffix,
    });
    yield Promise.all(paths.map((path) => __awaiter(void 0, void 0, void 0, function* () {
        return yield compress_1.compress({
            width: 1080,
            format: "jpeg",
            path,
            maxFileSizeInKB: 500,
            outputPath: config.outputImagesFolder,
        });
    })));
});
exports.toJpg1080 = toJpg1080;
const toJpg720 = ({ config, suffix }) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = yield file_handler_1.getFilesPath({
        path: config.imagesFolder,
        suffix: suffix,
    });
    yield Promise.all(paths.map((path) => __awaiter(void 0, void 0, void 0, function* () {
        return yield compress_1.compress({
            width: 720,
            format: "jpeg",
            path,
            maxFileSizeInKB: 400,
            outputPath: config.outputImagesFolder,
        });
    })));
});
exports.toJpg720 = toJpg720;
const toJpg640 = ({ config, suffix }) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = yield file_handler_1.getFilesPath({
        path: config.imagesFolder,
        suffix: suffix,
    });
    yield Promise.all(paths.map((path) => __awaiter(void 0, void 0, void 0, function* () {
        return yield compress_1.compress({
            width: 640,
            format: "jpeg",
            path,
            maxFileSizeInKB: 300,
            outputPath: config.outputImagesFolder,
        });
    })));
});
exports.toJpg640 = toJpg640;
const toJpeg1080Square = ({ config, suffix }) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = yield file_handler_1.getFilesPath({
        path: config.imagesFolder,
        suffix: suffix,
    });
    yield Promise.all(paths.map((path) => __awaiter(void 0, void 0, void 0, function* () {
        return yield compress_1.compress({
            format: "jpeg",
            path,
            width: 1080,
            height: 1080,
            outputPath: config.outputImagesFolder,
        });
    })));
});
exports.toJpeg1080Square = toJpeg1080Square;
const toJpegWebSML = ({ config }) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.toJpg1080({ config, suffix: "_lg" });
    yield exports.toJpg720({ config, suffix: "_md" });
    yield exports.toJpg640({ config, suffix: "_sm" });
});
exports.toJpegWebSML = toJpegWebSML;
exports.presetsList = [
    { name: "para jpg 1920 largura", method: exports.toJpg1920 },
    { name: "para jpg 1080 largura", method: exports.toJpg1080 },
    { name: "para jpeg 1080 quadrado", method: exports.toJpeg1080Square },
    { name: "para jpg 720  largura", method: exports.toJpg720 },
    { name: "para jpg 640 largura", method: exports.toJpg640 },
    { name: "para jpeg web (small, medium, large)", method: exports.toJpegWebSML },
];
//# sourceMappingURL=presets.js.map