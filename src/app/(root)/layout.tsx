import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

import { cn } from "~/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "../../components/ui/toaster";

export const metadata = {
  title: "Companhia Energética de Roraima - CERR",
  description: "Segunda via, parcelamento",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
