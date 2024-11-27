import React from 'react'

export default function Footer () {
  return (
    <footer className="w-full border-t border-teal-100 bg-teal-50 py-5">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          © 2024 Pequenglish
        </p>
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          Develop by{' '}
          <span className='font-bold text-sm hover:text-teal-600'>
            <a href="http://felipego.com" target="_blank" rel="noreferrer">
              felipego.com
            </a>
          </span>
        </p>

      </div>
    </div>
  </footer>
  )
}
