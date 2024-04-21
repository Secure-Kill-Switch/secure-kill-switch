import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@sks/web/animations.css";
import "@sks/web/background.css";
import "@sks/web/mantine-variables.css";
import "@sks/web/reset.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { Notifications } from "@mantine/notifications";
import { PageContainer } from "@sks/web/components";
import { sksTheme } from "@sks/web/helpers";
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
          <PageContainer>{children}</PageContainer>
          <Notifications position="top-right" />
        </MantineProvider>
      </body>
    </html>
  );
}
