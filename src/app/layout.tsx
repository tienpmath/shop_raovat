import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import "@/app/globals.css";
import NextAuthWrapper from "@/library/next.auth.wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rao vặt Đà Lạt - Lâm Đồng",
  description: "Rao vặt Đà Lạt - Lâm Đồng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <NextAuthWrapper>{children}</NextAuthWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
