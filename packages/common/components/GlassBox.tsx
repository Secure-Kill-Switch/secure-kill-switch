import { Box, BoxComponentProps } from "@mantine/core";
import { PropsWithChildren } from "react";

// @ts-ignore
import * as glassBoxClasses from "./GlassBox.module.css";

// @ts-ignore
export const glassBoxClassName = glassBoxClasses.glassBoxClass;

export const GlassBox = (props: PropsWithChildren<BoxComponentProps>) => (
  <Box {...props} className={glassBoxClassName}>
    {props.children}
  </Box>
);
