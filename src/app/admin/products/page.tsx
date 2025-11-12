import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Plus, Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getProducts() {
  return prisma.product.findMany({
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

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-sena-orange to-sena-green py-12 mb-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
              <p className="text-white/90 text-lg">
                Gestiona los productos de la Vitrina Nacional SENA
              </p>
            </div>
            <Link href="/admin/products/new">
              <Button className="bg-white text-sena-orange hover:bg-gray-100 font-semibold shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Producto
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container pb-8">

      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b-2">
          <CardTitle className="text-2xl flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-sena-orange to-sena-green rounded-full"></span>
            Productos <Badge className="bg-sena-orange text-white ml-2">{products.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 text-left">
                  <th className="p-4 font-semibold text-gray-700">Producto</th>
                  <th className="p-4 font-semibold text-gray-700">Centro</th>
                  <th className="p-4 font-semibold text-gray-700">Regional</th>
                  <th className="p-4 font-semibold text-gray-700">Categoría</th>
                  <th className="p-4 font-semibold text-gray-700">Precio</th>
                  <th className="p-4 font-semibold text-gray-700">Estado</th>
                  <th className="p-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                          {product.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{product.center.name}</td>
                    <td className="p-4 text-sm text-gray-700">{product.center.region.name}</td>
                    <td className="p-4 text-sm">
                      <Badge variant="outline" className="border-sena-orange text-sena-orange">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm font-semibold text-sena-orange">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <Badge
                        className={
                          product.status === 'PUBLISHED' 
                            ? 'bg-sena-green text-white' 
                            : 'bg-gray-400 text-white'
                        }
                      >
                        {product.status === 'PUBLISHED' ? '✓ Publicado' : '⏸ Borrador'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-sena-orange text-sena-orange hover:bg-sena-orange hover:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/products/${product.id}`}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-sena-green text-sena-green hover:bg-sena-green hover:text-white"
                          >
                            Ver
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <p className="text-lg">No hay productos todavía.</p>
                <p className="text-sm mt-2">Crea el primer producto para comenzar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
