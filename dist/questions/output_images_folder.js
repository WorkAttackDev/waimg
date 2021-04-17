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
const fs_1 = require("fs");
const inquirer_1 = __importDefault(require("inquirer"));
const outputImagesFolderQuestion = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "outputImagesFolder",
                message: "Qual o caminho de saida das imagens?: ",
                default: config.imagesFolder,
            },
        ]);
        const outDirExists = fs_1.existsSync(answers.outputImagesFolder);
        if (!outDirExists)
            return { error: "Pasta de saida não existe" };
        return { value: answers.outputImagesFolder };
    }
    catch (error) {
        return { error: "Ocorreu um erro ao definir a pasta de saida da imagens" };
    }
});
exports.default = outputImagesFolderQuestion;
//# sourceMappingURL=output_images_folder.js.map