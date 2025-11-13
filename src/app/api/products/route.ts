import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { ProductStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const regionId = searchParams.get('regionId') || undefined
    const centerId = searchParams.get('centerId') || undefined
    const category = searchParams.get('category') || undefined

    const products = await prisma.product.findMany({
      where: {
        status: ProductStatus.PUBLISHED,
        ...(q && {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
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

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, price, images, category, centerId, status } = body

    if (!title || !description || !category || !centerId) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: price ? parseInt(price) : null,
        images: typeof images === 'string' ? images : JSON.stringify(images),
        category,
        status: (status as ProductStatus) || ProductStatus.DRAFT,
        centerId,
      },
      include: {
        center: {
          include: {
            region: true,
          },
        },
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    )
  }
}
