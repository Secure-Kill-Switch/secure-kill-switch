import { Container, Flex, Title } from "@mantine/core";
import { ClientIcons } from "@sks/database";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ClientIcon } from "./ClientIcon";
import { GlassBox } from "./GlassBox";
import { SksLogo } from "./Logo";

export const PageContainer = ({
  children,
  userName,
  clientName,
  clientIcon,
  noPadding,
}: PropsWithChildren<{
  userName?: string;
  clientName?: string;
  clientIcon?: ClientIcons;
  noPadding?: boolean;
}>) => {
  return (
    <>
      <Container mt="20px" p={noPadding ? "0" : undefined}>
        <GlassBox mb="30px" pos="sticky" top="20px">
          <Flex align="center">
            <Link
              href="/"
              style={{
                cursor: "pointer",
                color: "unset",
                textDecoration: "none",
                outline: "none",
              }}
            >
              <SksLogo
                style={{
                  fill: "white",
                  marginRight: "15px",
                }}
              />
            </Link>
            <Link
              href="/"
              style={{
                cursor: "pointer",
                color: "unset",
                textDecoration: "none",
                outline: "none",
              }}
            >
              <Title
                size="22px"
                mt="2px"
                lts="-1px"
                unselectable="on"
                style={{ textTransform: "uppercase" }}
              >
                Secure Kill Switch
              </Title>
            </Link>
            {userName && (
              <Title
                size="22px"
                mr="10px"
                ml="auto"
                mt="2px"
                lts="-1px"
                unselectable="on"
              >
                Hi, {userName}!
              </Title>
            )}
            {clientIcon && (
              <ClientIcon
                icon={clientIcon}
                iconProps={{ style: { marginLeft: "auto" } }}
              />
            )}
            {clientName && (
              <Title
                size="22px"
                mr="10px"
                ml="10px"
                mt="2px"
                lts="-1px"
                unselectable="on"
              >
                {clientName}
              </Title>
            )}
          </Flex>
        </GlassBox>
      </Container>
      <Container mt="20px" mb="100px">
        {children}
      </Container>
    </>
  );
};

PageContainer.displayName = "PageContainer";
