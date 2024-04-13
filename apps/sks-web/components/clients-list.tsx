import { Box, Title } from "@mantine/core";
import { SKSClient } from "@prisma/client";

export const ClientsList = ({ clients }: { clients: SKSClient[] }) => {
  return (
    <Box mt="30px">
      <Title>Clients List</Title>
      {clients.length === 0 && <Box mt="20px">No clients found</Box>}
      {clients.map((client) => (
        <Box key={client.id}>
          {client.name}
          {client.id}
        </Box>
      ))}
    </Box>
  );
};
