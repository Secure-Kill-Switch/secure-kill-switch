import { IconProps } from "@tabler/icons-react";
import { ClientIconsNames, clientIconsComponents } from "../helpers";

export const ClientIcon = ({
  icon,
  iconProps,
  active: _active,
}: {
  icon: ClientIconsNames;
  iconProps?: IconProps;
  active?: boolean;
}) => {
  const ClientIconComponent = clientIconsComponents[icon]
    ? clientIconsComponents[icon]
    : clientIconsComponents["laptop"];

  return <ClientIconComponent {...iconProps} />;
};
