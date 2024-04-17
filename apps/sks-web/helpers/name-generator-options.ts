import {
  Config,
  adjectives,
  animals,
  colors,
  names,
  starWars,
} from "unique-names-generator";

export const nameGeneratorOptions = () =>
  ({
    dictionaries: [adjectives, colors, animals, names, starWars],
    style: "capital",
    separator: " ",
    length: 2,
  }) as Config;
