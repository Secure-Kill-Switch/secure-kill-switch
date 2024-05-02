"use client";
import { Badge, CopyButton, Flex, GridCol, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconActivity, IconClock, IconCopy } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useMemo } from "react";
import { shortenId, timeAgo } from "../../helpers";
import { ClientWithActions } from "../../types";
import { ClientIcon } from "../ClientIcon";
import { glassBoxClassName } from "../GlassBox";
import { ClientsItemDetailsMenu } from "./modals/ClientsItemDetailsMenu";
import { ClientsItemDetailsRenameModal } from "./modals/ClientsItemDetailsRenameModal";
import { ClientsItemDetailsShowNotificationModal } from "./modals/ClientsItemDetailsShowNotificationModal";

export const ClientDetails = ({
  client,
  userId,
  clientIndex,
}: {
  client: ClientWithActions;
  userId: string;
  clientIndex: number;
}) => {
  const [
    clientRenameModalOpened,
    { open: openClientRenameModal, close: closeClientRenameModal },
  ] = useDisclosure(false);
  const [
    clientShowNotificationModalOpened,
    {
      open: openClientNotificationModal,
      close: closeClientShowNotificationModal,
    },
  ] = useDisclosure(false);
  const actionsInfo = useMemo(() => {
    if (!client.actions.length) return "No actions";
    const actions: string[] = [];
    const pendingActions = client.actions?.filter(
      (action) => !action.isExecuted
    );
    const executedActions = client.actions?.filter(
      (action) => action.isExecuted
    );
    if (pendingActions?.length) {
      actions.push(`${pendingActions.length} pending`);
    }
    if (executedActions?.length) {
      actions.push(`${executedActions.length} executed`);
    }
    return `Actions: ${actions.length >= 2 ? actions.join(", ") : actions.join("")}`;
  }, [client.actions]);
  const isActive =
    !!client.lastActive && dayjs().diff(dayjs(client.lastActive), "minute") < 5;

  return (
    <>
      <GridCol
        className={glassBoxClassName}
        span={12}
        mt="25px"
        style={{
          animation: `fadeIn 0.5s ease ${(clientIndex / 2) * 0.2}s 1 normal both`,
        }}
      >
        <Flex
          direction={{
            base: "column",
            lg: "row",
          }}
          align="center"
        >
          <ClientIcon
            active={isActive}
            icon={client.icon}
            iconProps={{
              size: "100px",
              strokeWidth: 1,
              color: isActive ? "teal" : "gray",
            }}
          />
          <Flex
            direction="column"
            maw="100%"
            mt={{
              base: "30px",
              lg: 0,
            }}
            ml={{
              base: 0,
              lg: "20px",
            }}
          >
            <Flex mb="5px">
              <Title>{client.name}</Title>
              <CopyButton value={client.id}>
                {({ copied, copy }) => (
                  <Badge
                    style={{
                      textTransform: "none",
                      cursor: "pointer",
                      userSelect: "none",
                      maxWidth: "100%",
                      marginTop: "9px",
                      marginLeft: "15px",
                      fontWeight: 500,
                    }}
                    onClick={() => {
                      !copied &&
                        notifications.show({
                          title: "Client ID copied",
                          message: "Now you can paste it in the desktop app",
                          color: "teal",
                        });
                      !copied && copy();
                    }}
                    color={copied ? "green" : "gray"}
                    size="lg"
                    variant="transparent"
                    mb="10px"
                    rightSection={
                      <IconCopy size="16px" style={{ marginLeft: "5px" }} />
                    }
                  >
                    {shortenId(client.id)}
                  </Badge>
                )}
              </CopyButton>
            </Flex>
            <Flex>
              <ClientsItemDetailsMenu
                client={client}
                userId={userId}
                openClientRenameModal={openClientRenameModal}
                openClientNotificationModal={openClientNotificationModal}
              />
              <Badge
                style={{
                  textTransform: "none",
                  userSelect: "none",
                  maxWidth: "100%",
                  fontWeight: 500,
                }}
                w={{
                  base: "100%",
                  lg: "fit-content",
                }}
                size="lg"
                color="gray"
                variant="transparent"
                leftSection={
                  <IconActivity size="16px" style={{ marginRight: "5px" }} />
                }
              >
                {actionsInfo}
              </Badge>
              <Badge
                style={{
                  textTransform: "none",
                  userSelect: "none",
                  maxWidth: "100%",
                  fontWeight: 500,
                }}
                w={{
                  base: "100%",
                  lg: "fit-content",
                }}
                mr="10px"
                size="lg"
                leftSection={
                  <IconClock size="16px" style={{ marginRight: "5px" }} />
                }
                opacity={isActive ? 1 : 0.2}
                color={"gray"}
                variant="transparent"
                title={`${client.lastActive?.toLocaleDateString()} ${client.lastActive?.toLocaleTimeString()}`}
              >
                {timeAgo(client.lastActive)}
              </Badge>
            </Flex>
          </Flex>
        </Flex>
        <ClientsItemDetailsRenameModal
          client={client}
          clientRenameModalOpened={clientRenameModalOpened}
          closeClientRenameModal={closeClientRenameModal}
          userId={userId}
        />
        <ClientsItemDetailsShowNotificationModal
          client={client}
          clientShowNotificationModalOpened={clientShowNotificationModalOpened}
          closeClientShowNotificationModal={closeClientShowNotificationModal}
          userId={userId}
        />
      </GridCol>
    </>
  );
};
