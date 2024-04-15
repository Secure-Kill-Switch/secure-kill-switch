import { FontHeader } from "@/helpers/fonts";
import { Container, Title } from "@mantine/core";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Container mt={20}>
      <Link
        href="/"
        style={{
          cursor: "pointer",
          color: "black",
          textDecoration: "none",
          outline: "none",
        }}
      >
        <Title className={FontHeader.className} lh="26px" mb="30px">
          Secure
          <br />
          Kill
          <br />
          Switch
        </Title>
      </Link>
      {children}
    </Container>
  );
};
