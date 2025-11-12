import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      include: {
        _count: {
          select: {
            centers: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({ regions })
  } catch (error) {
    console.error('Error fetching regions:', error)
    return NextResponse.json(
      { error: 'Error al obtener regionales' },
      { status: 500 }
    )
  }
}
