import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import NextTopLoader from 'nextjs-toploader';
 
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'CareerSathi - Your Trusted Career Advisor',
  description: 'Personalized AI Career & Skills Advisor for Indian Students. Shape your tomorrow with intelligent career guidance.',
  keywords: 'career advisor, AI career guidance, Indian students, skills development, career planning',
  authors: [{ name: 'CareerSathi Team' }],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'CareerSathi - Your Trusted Career Advisor',
    description: 'Personalized AI Career & Skills Advisor for Indian Students',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerSathi - Your Trusted Career Advisor',
    description: 'Personalized AI Career & Skills Advisor for Indian Students',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={` antialiased`}>
        <NextTopLoader color="#B763C5" height={3} showSpinner={false} />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}