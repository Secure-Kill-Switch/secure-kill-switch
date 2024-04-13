import { FontHeader } from "@/helpers/fonts";
import { Container, Title } from "@mantine/core";
import { PropsWithChildren } from "react";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Container mt={20} w={600}>
      <Title className={FontHeader.className} lh="26px" mb="30px">
        Secure
        <br />
        Kill
        <br />
        Switch
      </Title>
      {children}
    </Container>
  );
};
