import { FontBody, FontHeader } from "@/helpers/fonts";
import { createTheme } from "@mantine/core";

export const sksTheme = createTheme({
  fontFamily: FontBody.style.fontFamily,
  headings: {
    fontFamily: FontHeader.style.fontFamily,
  },
});
