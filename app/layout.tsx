import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Toaster } from 'sonner'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Pequenglish - Tranforma el futuro de tus hijos',
  description: 'Una plataforma para aprender ingles para niño, administra tareas y horarios de estudio.'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${GeistSans.className} light`}>
      <body className="min-h-screen bg-gradient-to-b from-teal-50/40 to-teal-100/40">
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
