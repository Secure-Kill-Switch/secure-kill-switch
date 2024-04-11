import { FontBody } from "../helpers/fonts";
import "./reset.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Kill Switch",
  description:
    "Secure Kill Switch - Turn off your computer with a single click.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={FontBody.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
