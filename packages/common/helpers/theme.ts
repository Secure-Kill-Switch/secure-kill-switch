import { MantineThemeOverride, createTheme } from "@mantine/core";
import { FontBody, FontHeader } from "./fonts";

export const sksTheme: MantineThemeOverride = createTheme({
  fontFamily: FontBody.style.fontFamily,
  headings: {
    fontFamily: FontHeader.style.fontFamily,
  },
  defaultRadius: "10px",
});
