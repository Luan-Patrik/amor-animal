import Providers from '@/components/Providers'
import Navbar from '@/components/header/Navbar'
import { Toaster } from '@/components/ui/toaster'
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
    'Um site que divulga animais perdidos ou abandonado e sensibiliza as pessoas sobre a importância da adoção. O site apresenta os animais que estão para adoção e precisando do seu carinho.',
  icons: {
    icon: '/assets/logo.webp'
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
        <Providers>
          <Navbar />
          <main className='py-4'>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
