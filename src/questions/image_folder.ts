import { readdir } from "fs/promises";
import inquirer from "inquirer";
import { QuestionReturnType, QuestionType } from "../types";

const imagesFolderQuestion: QuestionType<string> = async () => {
  try {
    const answers = await inquirer.prompt<{ imagesFolder: string }>([
      {
        type: "input",
        name: "imagesFolder",
        message: "Qual o caminho da pasta de imagens?: ",
        default: __dirname,
      },
    ]);

    const dir = await readdir(answers.imagesFolder);

    if (!dir?.length) return { error: "Pasta de imagens vazia" };

    return { value: answers.imagesFolder };
  } catch (error) {
    return { error: "Ocorreu um erro ao abrir a pasta de imagens" };
  }
};

export default imagesFolderQuestion;
