import inquirer from "inquirer";
import { QuestionType } from "../types";

const usePresetQuestion: QuestionType<boolean> = async () => {
  try {
    const answers = await inquirer.prompt<{ usePreset: boolean }>([
      {
        type: "confirm",
        name: "usePreset",
        message: "Prefere usar um preset?: ",
        default: false,
      },
    ]);

    return { value: answers.usePreset };
  } catch (error) {
    return { error: "Ocorreu um erro ao definir a pasta de saida da imagens" };
  }
};

export default usePresetQuestion;
