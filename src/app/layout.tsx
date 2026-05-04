import './globals.css'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-handwriting', display: 'swap' })

export const metadata = {
  title: '나도 AI 아카데미 - 배움의 즐거움',
  description: '50대부터 시작하는 AI 실무 교육, NADOO AI ACADEMY',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <body>{children}</body>
    </html>
  )
}
