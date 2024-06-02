import type { Metadata } from "next";
import { Nunito_Sans, Kaushan_Script } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Samo Rezervisi",
  description: "Projekat",
};
//pacifico

const space = Kaushan_Script({
  weight: '400',
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

const nunito = Nunito_Sans({
  weight: '400',
  variable: '--font-nunito',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="rs" className={`${space.variable} ${nunito.variable}`}>
      <body className={nunito.className}>
        <Provider>
          {children}
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}
