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
const inquirer_1 = __importDefault(require("inquirer"));
const presets_1 = require("../presets");
const selectedPresetQuestion = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = yield inquirer_1.default.prompt([
            {
                type: "rawlist",
                name: "selectedPreset",
                message: "Selecione um preset?: ",
                choices: presets_1.presetsList.map((_pi) => _pi.name),
            },
        ]);
        const selectedPreset = presets_1.presetsList.find((_pItem) => _pItem.name === answers.selectedPreset);
        if (!selectedPreset)
            return { error: "Preset não foi encontrado" };
        yield selectedPreset.method({ config });
        return { value: answers.selectedPreset };
    }
    catch (error) {
        if (error.code === "ENOTEMPTY")
            return { error: "" };
        return { error: "Ocorreu um erro ao comprimir a imagem" };
    }
});
exports.default = selectedPresetQuestion;
//# sourceMappingURL=selected_preset.js.map