import { Container, Title } from "@mantine/core";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Container mt="20px" mb="100px">
      <Link
        href="/"
        style={{
          cursor: "pointer",
          color: "unset",
          textDecoration: "none",
          outline: "none",
        }}
      >
        <Title size="35px" lh="26px" mb="30px" lts="-1px">
          Secure Kill Switch
        </Title>
      </Link>
      {children}
    </Container>
  );
};
