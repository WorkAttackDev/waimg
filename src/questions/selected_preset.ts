import inquirer from "inquirer";
import { presetsList } from "../presets";
import { QuestionType } from "../types";

const selectedPresetQuestion: QuestionType<string> = async (config) => {
  try {
    const answers = await inquirer.prompt<{ selectedPreset: string }>([
      {
        type: "rawlist",
        name: "selectedPreset",
        message: "Selecione um preset?: ",
        choices: presetsList.map((_pi) => _pi.name),
      },
    ]);

    const selectedPreset = presetsList.find(
      (_pItem) => _pItem.name === answers.selectedPreset
    );

    if (!selectedPreset) return { error: "Preset não foi encontrado" };

    await selectedPreset.method({config});

    return { value: answers.selectedPreset };
  } catch (error) {
    if (error.code === "ENOTEMPTY") return { error: "" };
    return { error: "Ocorreu um erro ao comprimir a imagem" };
  }
};

export default selectedPresetQuestion;
