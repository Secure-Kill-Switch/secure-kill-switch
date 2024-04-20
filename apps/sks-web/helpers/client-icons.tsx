import {
  IconBrandUbuntu,
  IconBrandWindows,
  IconDeviceDesktop,
  IconDeviceImac,
  IconDeviceLaptop,
  IconProps,
} from "@tabler/icons-react";

export type ClientIconsNames =
  | "laptop"
  | "desktop"
  | "mac"
  | "linux"
  | "windows";

export type ClientIcons = Record<ClientIconsNames, JSX.Element>;
export type ClientIconsComponents = Record<
  ClientIconsNames,
  React.FC<IconProps>
>;

export const clientIcons = {
  // used for the client icons list (while creating a new client)
  laptop: <IconDeviceLaptop />,
  desktop: <IconDeviceDesktop />,
  mac: <IconDeviceImac />,
  linux: <IconBrandUbuntu />,
  windows: <IconBrandWindows />,
} as ClientIcons;

export const clientIconsComponents = {
  // used for the client details
  laptop: IconDeviceLaptop,
  desktop: IconDeviceDesktop,
  mac: IconDeviceImac,
  linux: IconBrandUbuntu,
  windows: IconBrandWindows,
} as ClientIconsComponents;
