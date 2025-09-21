import type { Metadata } from "next";

import "./globals.css";

import {Montserrat} from "next/font/google";


export const metadata: Metadata = {
  title: "Droplet",
  description: "Calculadora de impresion de resina",
};

export const montserrat = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
  
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${montserrat.className} text-transform: uppercase antialiased bg-[#729633] flex justify-center items-center min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
