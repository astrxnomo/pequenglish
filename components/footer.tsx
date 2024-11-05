import React from 'react'
import Link from 'next/link'

export default function Footer () {
  return (
    <footer className="w-full border-t border-teal-100 bg-teal-50 py-5">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          © 2024 Pequenglish. Develop by{' '}
          <span className='font-bold text-sm hover:text-teal-600'>
            <a href="http://felipego.com" target="_blank" rel="noreferrer">
              felipego.com
            </a>
          </span>
        </p>
        <nav className="flex gap-4">
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/terms" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
            Términos de Uso
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </div>
  </footer>
  )
}
