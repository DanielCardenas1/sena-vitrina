import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SENA Vitrina Nacional de Producción de Centros',
  description: 'Marketplace oficial para productos y servicios de los Centros de Formación SENA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
        <footer className="bg-gray-900 text-white">
          <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="8" fill="#FF6B00"/>
                    <path d="M14 18C14 16.8954 14.8954 16 16 16H20C21.1046 16 22 16.8954 22 18V22C22 23.1046 21.1046 24 20 24H16C14.8954 24 14 23.1046 14 22V18Z" fill="white"/>
                    <path d="M26 18C26 16.8954 26.8954 16 28 16H32C33.1046 16 34 16.8954 34 18V22C34 23.1046 33.1046 24 32 24H28C26.8954 24 26 23.1046 26 22V18Z" fill="white"/>
                    <path d="M14 26C14 24.8954 14.8954 24 16 24H32C33.1046 24 34 24.8954 34 26V30C34 31.1046 33.1046 32 32 32H16C14.8954 32 14 31.1046 14 30V26Z" fill="#39A935"/>
                  </svg>
                  <div>
                    <div className="text-lg font-bold text-[#FF6B00]">SENA</div>
                    <div className="text-sm text-gray-400">Vitrina de Producción</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  Plataforma oficial para la comercialización de productos y servicios desarrollados por los Centros de Formación del SENA en Colombia.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-white">Enlaces Rápidos</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Inicio</a></li>
                  <li><a href="/products" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Productos</a></li>
                  <li><a href="/admin/products" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Administrar</a></li>
                  <li><a href="https://www.sena.edu.co" target="_blank" rel="noopener" className="text-gray-400 hover:text-[#FF6B00] transition-colors">SENA.edu.co</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-white">Contacto</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Línea Nacional: 5925555</li>
                  <li>Bogotá: (601) 3430111</li>
                  <li>Línea gratuita: 018000 910270</li>
                  <li className="pt-2">
                    <a href="mailto:servicioalciudadano@sena.edu.co" className="text-[#FF6B00] hover:underline">
                      servicioalciudadano@sena.edu.co
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>© 2025 SENA - Servicio Nacional de Aprendizaje. Todos los derechos reservados.</p>
              <p className="mt-2">Dirección General - Vitrina Nacional de Producción de Centros</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
