'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-20 items-center">
        <Link href="/" className="flex items-center space-x-3">
          {/* Logo SENA oficial */}
          <div className="flex items-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#FF6B00"/>
              <path d="M14 18C14 16.8954 14.8954 16 16 16H20C21.1046 16 22 16.8954 22 18V22C22 23.1046 21.1046 24 20 24H16C14.8954 24 14 23.1046 14 22V18Z" fill="white"/>
              <path d="M26 18C26 16.8954 26.8954 16 28 16H32C33.1046 16 34 16.8954 34 18V22C34 23.1046 33.1046 24 32 24H28C26.8954 24 26 23.1046 26 22V18Z" fill="white"/>
              <path d="M14 26C14 24.8954 14.8954 24 16 24H32C33.1046 24 34 24.8954 34 26V30C34 31.1046 33.1046 32 32 32H16C14.8954 32 14 31.1046 14 30V26Z" fill="#39A935"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-[#FF6B00]">SENA</span>
            <span className="text-xs font-medium leading-none text-gray-600">Vitrina de Producción</span>
          </div>
        </Link>
        
        <nav className="ml-auto flex gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-semibold transition-colors hover:text-[#FF6B00] text-gray-700"
          >
            Inicio
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold transition-colors hover:text-[#FF6B00] text-gray-700"
          >
            Productos y Servicios
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-lg bg-[#39A935] text-white text-sm font-semibold hover:bg-[#2d8028] transition-colors"
          >
            Administrar
          </Link>
        </nav>
      </div>
    </header>
  )
}
