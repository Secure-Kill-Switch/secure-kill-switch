import { Title } from "@mantine/core";
import { SKSClient } from "@prisma/client";

export const ClientsList = ({ clients }: { clients: SKSClient[] }) => {
  return (
    <>
      <Title>Clients List</Title>
      {clients.map((client) => (
        <div key={client.id}>
          {client.name}
          {client.id}
        </div>
      ))}
    </>
  );
};
