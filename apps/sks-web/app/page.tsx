"use client";
import { Container, Title } from "@mantine/core";
import { SKSClient } from "@prisma/client";
import { FontHeader } from "@/helpers/fonts";
import { NewUserForm } from "@/components/new-user-form";
import { useRouter } from "next/navigation";

export default function HomePage(): JSX.Element {
  const { push } = useRouter();
  const onUserCreated = (client: SKSClient) => {
    push(`/client/${client.id}`);
  };
  return (
    <Container mt={20}>
      <Title className={FontHeader.className}>Secure Kill Switch</Title>
      <NewUserForm onUserCreated={onUserCreated} />
    </Container>
  );
}
