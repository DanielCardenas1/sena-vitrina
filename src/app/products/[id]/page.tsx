import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, parseImages } from '@/lib/utils'
import { RequestForm } from '@/components/RequestForm'
import { MapPin, Building2, Mail, Phone, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      center: {
        include: {
          region: true,
        },
      },
    },
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product || product.status !== 'PUBLISHED') {
    notFound()
  }

  const images = parseImages(product.images)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container py-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-6 hover:bg-sena-orange/10 hover:text-sena-orange">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Imágenes */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={images[0] || 'https://placehold.co/600x600?text=Sin+Imagen'}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1, 5).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 hover:border-sena-orange transition-colors cursor-pointer"
                  >
                    <Image src={img} alt={`${product.title} ${idx + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2">
                <Badge className="bg-sena-orange text-white hover:bg-sena-orange-dark text-sm px-3 py-1">
                  {product.category}
                </Badge>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-3xl font-bold text-sena-orange">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="mb-3 text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-sena-orange to-sena-green rounded-full"></span>
                Descripción
              </h2>
              <p className="whitespace-pre-line text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Información del centro */}
            <Card className="border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-sena-orange/10 to-sena-green/10">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-sena-orange" />
                  Centro Productor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-sena-orange" />
                  <div>
                    <p className="font-semibold text-gray-900">{product.center.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {product.center.region.name}
                    </p>
                  </div>
                </div>

                {product.center.contactEmail && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-sena-orange/5 transition-colors">
                    <Mail className="h-5 w-5 text-sena-green" />
                    <a
                      href={`mailto:${product.center.contactEmail}`}
                      className="text-sm text-sena-green hover:text-sena-green-dark font-medium hover:underline"
                    >
                      {product.center.contactEmail}
                    </a>
                  </div>
                )}

                {product.center.contactPhone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-sena-orange/5 transition-colors">
                    <Phone className="h-5 w-5 text-sena-green" />
                    <a
                      href={`tel:${product.center.contactPhone}`}
                      className="text-sm text-sena-green hover:text-sena-green-dark font-medium hover:underline"
                    >
                      {product.center.contactPhone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Formulario de solicitud */}
            <Card className="border-2 border-sena-orange/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-sena-orange to-sena-green">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Solicitar Información
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <RequestForm productId={product.id} productTitle={product.title} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
