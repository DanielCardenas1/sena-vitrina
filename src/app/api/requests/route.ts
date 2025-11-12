import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, productId } = body

    // Validaciones
    if (!name || !email || !productId) {
      return NextResponse.json(
        { error: 'Nombre, email y producto son requeridos' },
        { status: 400 }
      )
    }

    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }

    // Crear la solicitud
    const requestData = await prisma.request.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: message || null,
        productId,
      },
    })

    // TODO: Aquí puedes agregar envío de email con nodemailer si lo necesitas
    // if (process.env.CONTACT_EMAIL) {
    //   await sendNotificationEmail(requestData)
    // }

    return NextResponse.json(
      { 
        id: requestData.id,
        message: 'Solicitud enviada exitosamente' 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Error al crear la solicitud' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    const requests = await prisma.request.findMany({
      where: productId ? { productId } : undefined,
      include: {
        product: {
          include: {
            center: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ requests })
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Error al obtener solicitudes' },
      { status: 500 }
    )
  }
}
