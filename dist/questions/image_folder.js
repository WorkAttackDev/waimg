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
const promises_1 = require("fs/promises");
const inquirer_1 = __importDefault(require("inquirer"));
const imagesFolderQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "imagesFolder",
                message: "Qual o caminho da pasta de imagens?: ",
                default: __dirname,
            },
        ]);
        const dir = yield promises_1.readdir(answers.imagesFolder);
        if (!(dir === null || dir === void 0 ? void 0 : dir.length))
            return { error: "Pasta de imagens vazia" };
        return { value: answers.imagesFolder };
    }
    catch (error) {
        return { error: "Ocorreu um erro ao abrir a pasta de imagens" };
    }
});
exports.default = imagesFolderQuestion;
//# sourceMappingURL=image_folder.js.map