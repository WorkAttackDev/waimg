import { existsSync } from "fs";
import inquirer from "inquirer";
import { QuestionType } from "../types";

const outputImagesFolderQuestion: QuestionType<string> = async (config) => {
  try {
    const answers = await inquirer.prompt<{ outputImagesFolder: string }>([
      {
        type: "input",
        name: "outputImagesFolder",
        message: "Qual o caminho de saida das imagens?: ",
        default: config.imagesFolder,
      },
    ]);

    const outDirExists = existsSync(answers.outputImagesFolder);

    if (!outDirExists) return { error: "Pasta de saida não existe" };

    return { value: answers.outputImagesFolder };
  } catch (error) {
    return { error: "Ocorreu um erro ao definir a pasta de saida da imagens" };
  }
};

export default outputImagesFolderQuestion;
