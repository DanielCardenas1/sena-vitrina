import { prisma } from '@/lib/prisma'
import { FiltersBar } from '@/components/FiltersBar'
import { ProductCard } from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

async function getFiltersData() {
  const [regions, centers, products] = await Promise.all([
    prisma.region.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.center.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      select: { category: true },
      distinct: ['category'],
    }),
  ])

  const categories = products.map((p) => p.category).sort()

  return { regions, centers, categories }
}

async function getProducts(searchParams: {
  q?: string
  regionId?: string
  centerId?: string
  category?: string
}) {
  const { q, regionId, centerId, category } = searchParams

  return prisma.product.findMany({
    where: {
      status: 'PUBLISHED',
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      }),
      ...(category && { category }),
      ...(centerId && { centerId }),
      ...(regionId && {
        center: {
          regionId,
        },
      }),
    },
    include: {
      center: {
        include: {
          region: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; regionId?: string; centerId?: string; category?: string }
}) {
  const [filtersData, products] = await Promise.all([
    getFiltersData(),
    getProducts(searchParams),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FF6B00] to-[#39A935] py-12">
        <div className="container">
          <h1 className="mb-3 text-4xl font-bold text-white">Catálogo de Productos y Servicios</h1>
          <p className="text-white/90 text-lg">
            Descubre {products.length} productos y servicios de calidad SENA disponibles en todo el país
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="mb-8">
          <FiltersBar
            regions={filtersData.regions}
            centers={filtersData.centers}
            categories={filtersData.categories}
          />
        </div>

      {products.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium">No se encontraron productos</p>
            <p className="text-sm text-muted-foreground">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
