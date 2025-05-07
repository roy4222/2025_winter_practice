import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "待辦事項清單 | Firebase 示例",
  description: "使用 Next.js 和 Firebase 構建的待辦事項清單應用",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
