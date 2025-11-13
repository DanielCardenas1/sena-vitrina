import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export async function GET() {
  try {
    const centers = await prisma.center.findMany({
      include: {
        region: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({ centers })
  } catch (error) {
    console.error('Error fetching centers:', error)
    return NextResponse.json(
      { error: 'Error al obtener centros' },
      { status: 500 }
    )
  }
}
