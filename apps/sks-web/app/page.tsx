"use client";
import { Container, Title } from "@mantine/core";
import { FontHeader } from "../helpers/fonts";

export default function HomePage(): JSX.Element {
  return (
    <Container mt={20}>
      <Title className={FontHeader.className}>Secure Kill Switch</Title>
    </Container>
  );
}
