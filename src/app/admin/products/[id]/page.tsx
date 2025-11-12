import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/ProductForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function getFormData(productId: string) {
  const [product, centers, products] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
    }),
    prisma.center.findMany({
      include: {
        region: true,
      },
      orderBy: { name: 'asc' },
    }),
    prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      select: { category: true },
      distinct: ['category'],
    }),
  ])

  if (!product) {
    notFound()
  }

  const categories = products.map((p) => p.category).sort()

  return { product, centers, categories }
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { product, centers, categories } = await getFormData(params.id)

  return (
    <ProductForm
      product={product}
      centers={centers}
      categories={categories}
    />
  )
}
