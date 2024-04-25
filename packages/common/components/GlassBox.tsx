import { Box, BoxComponentProps } from "@mantine/core";
import { PropsWithChildren } from "react";

// Below errors are ignored, we need to `tsc` these files
// just to get the types, bundling is actually made in /apps/web
// and nextjs there handles it properly
// @ts-ignore
import * as glassBoxClasses from "./GlassBox.module.css";
// @ts-ignore
export const glassBoxClassName = glassBoxClasses.glassBoxClass;

export const GlassBox = (props: PropsWithChildren<BoxComponentProps>) => (
  <Box {...props} className={`${glassBoxClassName} noise`}>
    {props.children}
  </Box>
);
