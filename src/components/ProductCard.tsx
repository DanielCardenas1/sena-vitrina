'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, parseImages } from '@/lib/utils'
import { MapPin } from 'lucide-react'

type Product = {
  id: string
  title: string
  description: string
  price: number | null
  images: string
  category: string
  center: {
    name: string
    region: {
      name: string
    }
  }
}

export function ProductCard({ product }: { product: Product }) {
  const images = parseImages(product.images)
  const firstImage = images[0] || 'https://placehold.co/600x400?text=Sin+Imagen'

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-gray-200 bg-white">
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image
            src={firstImage}
            alt={product.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-[#FF6B00] text-white border-none shadow-md">
              {product.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 min-h-[3.5rem]">
            {product.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-relaxed min-h-[2.5rem]">
            {product.description}
          </p>
          <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#39A935]" />
            <span className="line-clamp-2 leading-tight">
              {product.center.name} - {product.center.region.name}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-gray-100">
          <div className="text-2xl font-bold text-[#FF6B00]">
            {formatPrice(product.price)}
          </div>
          <Button variant="ghost" size="sm" className="text-[#39A935] hover:text-[#2d8028] hover:bg-[#39A935]/10">
            Ver más →
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
