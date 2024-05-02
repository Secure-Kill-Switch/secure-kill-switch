import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import "@sks/common/animations.css";
import "@sks/common/background.css";
import "@sks/common/mantine-variables.css";
import "@sks/common/reset.css";

import { sksTheme } from "@sks/common/helpers";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { Notifications } from "@mantine/notifications";
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
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider
          defaultColorScheme="dark"
          forceColorScheme="dark"
          theme={sksTheme}
        >
          {children}
          <Notifications position="top-right" />
        </MantineProvider>
      </body>
    </html>
  );
}
