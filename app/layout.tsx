import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Toaster } from 'sonner'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Pequenglish - Plataforma Educativa para Niños',
  description: 'Una plataforma divertida e interactiva para que los niños aprendan ingles'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={GeistSans.className}>
      <body className="min-h-screen bg-gradient-to-b from-teal-50/50 to-teal-100/50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
