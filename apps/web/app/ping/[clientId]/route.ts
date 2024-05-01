import { prismaWebClient } from "@/helpers/prisma";

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
  const clientData = await prismaWebClient.sKSClient.findUnique({
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
    const actions = await prismaWebClient.sKSAction.findMany({
      where: {
        sKSClientId: clientId,
      },
    });
    const updateLastPing = await prismaWebClient.sKSClient.update({
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
