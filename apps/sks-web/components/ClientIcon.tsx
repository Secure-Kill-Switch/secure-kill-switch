import {
  ClientIconsNames,
  clientIconsComponents,
} from "@/helpers/client-icons";
import { IconProps } from "@tabler/icons-react";

export const ClientIcon = ({
  icon,
  iconProps,
}: {
  icon: ClientIconsNames;
  iconProps?: IconProps;
}) => {
  const ClientIconComponent = clientIconsComponents[icon]
    ? clientIconsComponents[icon]
    : clientIconsComponents["laptop"];

  return <ClientIconComponent {...iconProps} />;
};
