"use client";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { GlassBox } from "@sks/common/components";
import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";

const store = new Store(".sks-settings.dat");

export const dynamic = "force-dynamic";

export default function Home() {
  const [clientId, setClientId] = useState<string | null>();
  const clientIdForm = useForm({
    initialValues: {
      clientId: "",
    },
    validate: {
      clientId: (value) => {
        if (!value) return "Client ID is required";
        return null;
      },
    },
  });
  const saveClientIdOnSubmit = async () => {
    console.log("saveClientIdOnSubmit");
    await store.set("clientId", clientIdForm.values.clientId);
    await store.save();
    setClientId(clientIdForm.values.clientId);
  };
  const resetClientId = async () => {
    setClientId(null);
    await store.delete("clientId");
  };
  useEffect(() => {
    (async () => {
      const clientId = (await store.get("clientId")) as string | null;
      if (clientId !== null) {
        clientIdForm.setValues({ clientId });
        setClientId(clientId);
      }
    })();
  }, []);
  return (
    <GlassBox mb="20px">
      {clientId && (
        <>
          <Text>Your ID is {clientId}. You're all set.</Text>
          <Button variant="light" onClick={resetClientId}>
            Reset Client ID
          </Button>
        </>
      )}
      {!clientId && (
        <>
          <Text>Insert your Client ID</Text>
          <Form form={clientIdForm} onSubmit={saveClientIdOnSubmit}>
            <Group>
              <TextInput
                placeholder="Client ID"
                w="100%"
                mr="10px"
                {...clientIdForm.getInputProps("clientId")}
              />
              <Button variant="light" type="submit">
                Connect
              </Button>
            </Group>
          </Form>
        </>
      )}
    </GlassBox>
  );
}
