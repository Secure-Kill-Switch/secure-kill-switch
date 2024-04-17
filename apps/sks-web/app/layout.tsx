import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "./animations.css";
import "./background.css";
import "./reset.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { PageContainer } from "@/components/page-container";
import { sksTheme } from "@/helpers/theme";
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
          <PageContainer>{children}</PageContainer>
          <Notifications position="top-right" />
        </MantineProvider>
      </body>
    </html>
  );
}
