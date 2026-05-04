import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: '400',
  variable: '--font-handwriting',
});

export const metadata: Metadata = {
  title: "나도 AI 실전 아카데미 | 실전 맞춤 AI 교육",
  description: "AI로 업무 효율을 높이고 성과를 향상시키는 실전 맞춤형 AI 클래스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${cormorant.variable} ${nanumPen.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
