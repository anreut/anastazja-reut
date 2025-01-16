import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import "../styles/main.scss";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anastazja Reut",
  description: "Blog by Anastazja Reut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
