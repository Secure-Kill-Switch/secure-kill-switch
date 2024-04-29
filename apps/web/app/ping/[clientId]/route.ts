import { prisma } from "@sks/common/helpers";

type PingParams = {
  clientId: string;
};

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: PingParams;
  }
): Promise<Response> {
  const { clientId } = params;
  const clientData = await prisma.sKSClient.findUnique({
    where: {
      id: clientId,
    },
  });
  if (!clientData) {
    return new Response(JSON.stringify({ message: "Client not found" }), {
      status: 404,
    });
  }
  try {
    const actions = await prisma.sKSAction.findMany({
      where: {
        sKSClientId: clientId,
      },
    });
    const updateLastPing = await prisma.sKSClient.update({
      where: {
        id: clientId,
      },
      data: {
        ...clientData,
        lastActive: new Date(),
      },
    });
    const response = { ...updateLastPing, actions };
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating client", error, clientData }),
      {
        status: 500,
      }
    );
  }
}
