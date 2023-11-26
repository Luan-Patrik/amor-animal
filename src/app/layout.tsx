import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  preload: true,
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'Amor Animal',
  description:
    'Um site que divulga a causa animal e sensibiliza as pessoas sobre a importância da adoção. O site apresenta os animais que estão para adoção em diversas instituições parceiras.',
  icons: {
    icon: '/assets/dog.webp'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt' className={lato.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
