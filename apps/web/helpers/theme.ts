import { FontBody, FontHeader } from "@/helpers/fonts";
import { MantineThemeOverride, createTheme } from "@mantine/core";

export const sksTheme: MantineThemeOverride = createTheme({
  fontFamily: FontBody.style.fontFamily,
  headings: {
    fontFamily: FontHeader.style.fontFamily,
  },
  defaultRadius: "16px",
});
