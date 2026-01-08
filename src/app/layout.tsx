import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { HeadLinks } from "@/components/HeadLinks";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Portfolio | Yohann CHAVANEL",
    description: "Porfolio de Yohann CHAVANEL",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <HeadLinks />
            {children}
        </body>
        </html>
    );
}
