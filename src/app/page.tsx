import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, Building2, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Estilo SENA */}
      <section className="relative bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#39A935] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                🇨🇴 Hecho en Colombia con calidad SENA
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
                Vitrina Nacional de<br />
                <span className="text-white/90">Producción de Centros</span>
              </h1>
              <p className="mb-8 text-lg text-white/90 sm:text-xl leading-relaxed">
                Conecta con productos y servicios desarrollados por aprendices e instructores SENA. Innovación, calidad y compromiso social en cada proyecto.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-[#FF6B00] hover:bg-gray-100 font-semibold shadow-lg">
                    Explorar Productos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold">
                    Ver Categorías
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                        <Package className="h-8 w-8 text-[#FF6B00]" />
                      </div>
                      <div className="text-white">
                        <div className="text-2xl font-bold">150+</div>
                        <div className="text-sm text-white/80">Productos Activos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-[#39A935]" />
                      </div>
                      <div className="text-white">
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-sm text-white/80">Centros Participantes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                        <Globe className="h-8 w-8 text-[#FF6B00]" />
                      </div>
                      <div className="text-white">
                        <div className="text-2xl font-bold">32</div>
                        <div className="text-sm text-white/80">Regionales</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir la Vitrina SENA?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Apoyamos el talento colombiano conectando a los centros de formación con el mercado nacional
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8C00]">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Productos de Calidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Alimentos, artesanías, muebles, tecnología y servicios profesionales desarrollados con los más altos estándares de calidad SENA.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#39A935] to-[#2d8028]">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Red Nacional de Centros</h3>
              <p className="text-gray-600 leading-relaxed">
                Acceso directo a productos de centros de formación en las 32 regionales, conectando todo el territorio colombiano.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#39A935]">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Impacto Social</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada compra apoya la formación de aprendices y el desarrollo económico de las comunidades locales en Colombia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra lo que necesitas en nuestras categorías especializadas
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/products?category=Alimentos y Bebidas" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-lg transition-all border border-orange-200">
                <div className="text-4xl mb-4">🍯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Alimentos y Bebidas</h3>
                <p className="text-gray-600 text-sm mb-4">Productos artesanales, lácteos, panadería y más</p>
                <span className="text-[#FF6B00] font-semibold group-hover:underline">Ver productos →</span>
              </div>
            </Link>
            <Link href="/products?category=Textiles y Confecciones" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all border border-blue-200">
                <div className="text-4xl mb-4">👕</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Textiles y Confecciones</h3>
                <p className="text-gray-600 text-sm mb-4">Prendas, uniformes y accesorios de calidad</p>
                <span className="text-[#FF6B00] font-semibold group-hover:underline">Ver productos →</span>
              </div>
            </Link>
            <Link href="/products?category=Tecnología e Innovación" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all border border-purple-200">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tecnología e Innovación</h3>
                <p className="text-gray-600 text-sm mb-4">Software, desarrollo web y servicios TI</p>
                <span className="text-[#FF6B00] font-semibold group-hover:underline">Ver productos →</span>
              </div>
            </Link>
            <Link href="/products?category=Muebles y Carpintería" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all border border-green-200">
                <div className="text-4xl mb-4">🪑</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Muebles y Carpintería</h3>
                <p className="text-gray-600 text-sm mb-4">Muebles a medida, diseño y restauración</p>
                <span className="text-[#FF6B00] font-semibold group-hover:underline">Ver productos →</span>
              </div>
            </Link>
            <Link href="/products?category=Servicios Profesionales" className="group">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 hover:shadow-lg transition-all border border-yellow-200">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Servicios Profesionales</h3>
                <p className="text-gray-600 text-sm mb-4">Capacitaciones, asesorías y consultorías</p>
                <span className="text-[#FF6B00] font-semibold group-hover:underline">Ver productos →</span>
              </div>
            </Link>
            <Link href="/products?category=Artesanías" className="group">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-lg transition-all border border-pink-200">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Artesanías</h3>
                <p className="text-gray-600 text-sm mb-4">Joyería, cerámica y productos artesanales</p>
                <span className="text-[#FF6B00] font-semibold group-hover:underline">Ver productos →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-[#FF6B00] to-[#39A935] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="mb-6 text-4xl font-bold">Descubre el Talento Colombiano</h2>
            <p className="mb-8 text-xl text-white/90 leading-relaxed">
              Explora nuestra vitrina y encuentra productos únicos creados por aprendices e instructores de los Centros de Formación SENA en todo el país
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-white text-[#FF6B00] hover:bg-gray-100 font-semibold text-lg px-8 py-6 shadow-xl">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
