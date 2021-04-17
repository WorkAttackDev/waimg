import { CLIConfig, OutImageType } from "./types";
import { getFilesPath } from "./file_handler";

import inquirer from "inquirer";
import { readdir } from "fs/promises";
import { existsSync } from "fs";
import { presetsList } from "./presets";
import imagesFolderQuestion from "./questions/image_folder";
import outputImagesFolderQuestion from "./questions/output_images_folder";
import usePresetQuestion from "./questions/use_preset";
import selectedPresetQuestion from "./questions/selected_preset";

const config: CLIConfig = {
  imagesFolder: "",
  outputImagesFolder: "",
  selectedPreset: "",
  usePreset: false,
};

const main = async () => {
  const imagesFolderAnswer = await imagesFolderQuestion(config);

  if (imagesFolderAnswer?.error) return console.log(imagesFolderAnswer.error);
  config.imagesFolder = imagesFolderAnswer.value!;

  const outputImagesFolderAnswer = await outputImagesFolderQuestion(config);

  if (outputImagesFolderAnswer?.error)
    return console.log(outputImagesFolderAnswer.error);
  config.outputImagesFolder = outputImagesFolderAnswer.value!;

  const usePresetAnswer = await usePresetQuestion(config);
  if (usePresetAnswer?.error) return console.log(usePresetAnswer.error);
  config.usePreset = usePresetAnswer.value!;

  if (config.usePreset) {
    const selectedPresetAnswer = await selectedPresetQuestion(config);
    if (selectedPresetAnswer?.error)
      return console.log(selectedPresetAnswer.error);
    config.selectedPreset = selectedPresetAnswer.value!;
    return console.log("Os ficheiros foram compressos com sucesso 👌✔✨");
  }

  console.log("Brevemente poderá customizar mais 👌✔✨");
};

main();
