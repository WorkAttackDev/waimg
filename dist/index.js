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
const image_folder_1 = __importDefault(require("./questions/image_folder"));
const output_images_folder_1 = __importDefault(require("./questions/output_images_folder"));
const use_preset_1 = __importDefault(require("./questions/use_preset"));
const selected_preset_1 = __importDefault(require("./questions/selected_preset"));
const config = {
    imagesFolder: "",
    outputImagesFolder: "",
    selectedPreset: "",
    usePreset: false,
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const imagesFolderAnswer = yield image_folder_1.default(config);
    if (imagesFolderAnswer === null || imagesFolderAnswer === void 0 ? void 0 : imagesFolderAnswer.error)
        return console.log(imagesFolderAnswer.error);
    config.imagesFolder = imagesFolderAnswer.value;
    const outputImagesFolderAnswer = yield output_images_folder_1.default(config);
    if (outputImagesFolderAnswer === null || outputImagesFolderAnswer === void 0 ? void 0 : outputImagesFolderAnswer.error)
        return console.log(outputImagesFolderAnswer.error);
    config.outputImagesFolder = outputImagesFolderAnswer.value;
    const usePresetAnswer = yield use_preset_1.default(config);
    if (usePresetAnswer === null || usePresetAnswer === void 0 ? void 0 : usePresetAnswer.error)
        return console.log(usePresetAnswer.error);
    config.usePreset = usePresetAnswer.value;
    if (config.usePreset) {
        const selectedPresetAnswer = yield selected_preset_1.default(config);
        if (selectedPresetAnswer === null || selectedPresetAnswer === void 0 ? void 0 : selectedPresetAnswer.error)
            return console.log(selectedPresetAnswer.error);
        config.selectedPreset = selectedPresetAnswer.value;
        return console.log("Os ficheiros foram compressos com sucesso 👌✔✨");
    }
    console.log("Brevemente poderá customizar mais 👌✔✨");
});
main();
//# sourceMappingURL=index.js.map