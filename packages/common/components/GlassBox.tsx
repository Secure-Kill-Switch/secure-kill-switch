import { Box, BoxComponentProps } from "@mantine/core";
import { PropsWithChildren } from "react";

// @ts-ignore
import * as glassBoxClasses from "./GlassBox.module.css";

export const glassBoxClassName = glassBoxClasses.glassBoxClass;

export const GlassBox = (props: PropsWithChildren<BoxComponentProps>) => (
  <Box {...props} className={`${glassBoxClassName} noise`}>
    {props.children}
  </Box>
);
