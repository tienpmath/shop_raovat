import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import "@/app/globals.css";
import NextAuthWrapper from "@/library/next.auth.wrapper";
import { auth } from "@/auth";
import Header from "@/components/home/header.client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rao vặt Đà Lạt - Lâm Đồng",
  description: "Rao vặt Đà Lạt - Lâm Đồng",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <NextAuthWrapper>
            <Header user={session?.user} />
            {children}
          </NextAuthWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
