import type { Metadata } from "next";
import "../app/ui/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FontAwesomeConfig from "../app/ui/fontawesome";
import Bootstrap from "./bootstrap";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <FontAwesomeConfig />
        <Bootstrap />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

