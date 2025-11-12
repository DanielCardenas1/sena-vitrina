import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/ProductForm'

export const dynamic = 'force-dynamic'

async function getFormData() {
  const [centers, products] = await Promise.all([
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

  const categories = products.map((p) => p.category).sort()

  return { centers, categories }
}

export default async function NewProductPage() {
  const { centers, categories } = await getFormData()

  return <ProductForm centers={centers} categories={categories} />
}
