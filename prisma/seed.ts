import { PrismaClient, ProductStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Crear Regiones
  const regiones = [
    { name: 'Bogotá D.C.' },
    { name: 'Antioquia' },
    { name: 'Valle del Cauca' },
  ]

  const regionesCreated = []
  for (const region of regiones) {
    const r = await prisma.region.upsert({
      where: { name: region.name },
      update: {},
      create: region,
    })
    regionesCreated.push(r)
    console.log(`✅ Región creada: ${r.name}`)
  }

  // Crear Centros
  const centros = [
    {
      name: 'Centro de Biotecnología Industrial',
      regionId: regionesCreated[0].id,
      contactEmail: 'cbi@sena.edu.co',
      contactPhone: '601-5461500',
    },
    {
      name: 'Centro de Gestión de Mercados, Logística y TI',
      regionId: regionesCreated[0].id,
      contactEmail: 'cgmlti@sena.edu.co',
      contactPhone: '601-5461600',
    },
    {
      name: 'Centro de Tecnología de la Manufactura Avanzada',
      regionId: regionesCreated[1].id,
      contactEmail: 'ctma@sena.edu.co',
      contactPhone: '604-4050200',
    },
    {
      name: 'Centro de Diseño e Innovación Tecnológica Industrial',
      regionId: regionesCreated[1].id,
      contactEmail: 'cditi@sena.edu.co',
      contactPhone: '604-4050300',
    },
    {
      name: 'Centro Latinoamericano de Especies Menores',
      regionId: regionesCreated[2].id,
      contactEmail: 'clem@sena.edu.co',
      contactPhone: '602-4860100',
    },
  ]

  const centrosCreated = []
  for (const centro of centros) {
    const c = await prisma.center.create({
      data: centro,
    })
    centrosCreated.push(c)
    console.log(`✅ Centro creado: ${c.name}`)
  }

  // Crear Productos
  const categorias = [
    'Alimentos y Bebidas',
    'Textiles y Confecciones',
    'Tecnología e Innovación',
    'Muebles y Carpintería',
    'Servicios Profesionales',
    'Artesanías',
  ]

  const productos = [
    {
      title: 'Miel Artesanal Orgánica 500g',
      description: 'Miel de abeja 100% pura y orgánica, producida en el apiario del centro. Sin aditivos ni conservantes. Ideal para endulzar de forma natural.',
      price: 25000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1587049352846-4a222e784720?w=800',
        'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800',
      ]),
      category: categorias[0],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[0].id,
    },
    {
      title: 'Lácteos Artesanales - Queso Campesino',
      description: 'Queso fresco tipo campesino, elaborado con leche de vaca 100% natural. Peso aproximado: 500g. Ideal para acompañar arepas o ensaladas.',
      price: 18000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800',
      ]),
      category: categorias[0],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[4].id,
    },
    {
      title: 'Software de Gestión Empresarial (ERP)',
      description: 'Sistema de gestión empresarial desarrollado por aprendices. Módulos: inventarios, ventas, facturación y reportes. Incluye soporte técnico.',
      price: 1500000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      ]),
      category: categorias[2],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[1].id,
    },
    {
      title: 'Mesa de Comedor en Madera de Roble',
      description: 'Mesa rectangular para 6 personas. Dimensiones: 180x90cm. Acabado en barniz natural resistente al agua. Diseño moderno y minimalista.',
      price: 850000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=800',
      ]),
      category: categorias[3],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[3].id,
    },
    {
      title: 'Camisetas Estampadas Personalizadas',
      description: 'Camisetas 100% algodón con estampado personalizado. Disponible en tallas S a XXL. Colores variados. Pedido mínimo: 20 unidades.',
      price: 35000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      ]),
      category: categorias[1],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[2].id,
    },
    {
      title: 'Mochilas en Lona Resistente',
      description: 'Mochila urbana con capacidad de 25L. Material: lona encerada resistente al agua. Compartimento para portátil hasta 15". Diseño ergonómico.',
      price: 120000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      ]),
      category: categorias[1],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[2].id,
    },
    {
      title: 'Mermelada de Frutas Tropicales 300g',
      description: 'Mermelada artesanal elaborada con frutas frescas de la región. Sabores: mora, fresa, mango, guayaba. Sin colorantes artificiales.',
      price: 12000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800',
      ]),
      category: categorias[0],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[0].id,
    },
    {
      title: 'Desarrollo de Aplicaciones Móviles',
      description: 'Servicio de desarrollo de apps nativas para iOS y Android. Incluye diseño UX/UI, desarrollo, pruebas y publicación en stores.',
      price: 3500000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      ]),
      category: categorias[2],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[1].id,
    },
    {
      title: 'Silla Ergonómica de Oficina',
      description: 'Silla giratoria con respaldo alto, ajuste de altura y apoyabrazos. Base en aluminio con ruedas. Tapizado en malla transpirable.',
      price: 450000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
      ]),
      category: categorias[3],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[3].id,
    },
    {
      title: 'Bolsos Artesanales en Cuero',
      description: 'Bolso de mano en cuero genuino curtido vegetal. Cierre magnético, forro interno y compartimento con cremallera. Hecho a mano.',
      price: 280000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
      ]),
      category: categorias[5],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[2].id,
    },
    {
      title: 'Pan Artesanal de Masa Madre',
      description: 'Pan elaborado con masa madre natural y fermentación lenta (48h). Sin conservantes. Variedades: integral, centeno, multicereal. Peso: 600g.',
      price: 15000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      ]),
      category: categorias[0],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[0].id,
    },
    {
      title: 'Curso de Capacitación en Manufactura Digital',
      description: 'Programa de formación en tecnologías 4.0: impresión 3D, CNC, diseño CAD/CAM. Duración: 40 horas. Incluye certificado SENA.',
      price: 500000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
      ]),
      category: categorias[4],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[2].id,
    },
    {
      title: 'Jabones Artesanales Naturales 100g',
      description: 'Jabones elaborados con ingredientes naturales: aceite de coco, manteca de karité y aceites esenciales. Disponibles en lavanda, romero, eucalipto y menta. Libres de parabenos y sulfatos.',
      price: 8000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=800',
      ]),
      category: categorias[5],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[0].id,
    },
    {
      title: 'Servicio de Diseño Gráfico Profesional',
      description: 'Diseño de logotipos, branding, material publicitario y contenido para redes sociales. Incluye 3 propuestas iniciales, revisiones ilimitadas y archivos en formatos vectoriales.',
      price: 800000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
      ]),
      category: categorias[2],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[1].id,
    },
    {
      title: 'Uniformes Empresariales Personalizados',
      description: 'Confección de uniformes corporativos en tallas S a 3XL. Incluye bordado del logo empresarial. Telas de alta calidad y durabilidad. Pedido mínimo: 10 unidades.',
      price: 65000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
      ]),
      category: categorias[1],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[2].id,
    },
    {
      title: 'Estantería Modular en Madera',
      description: 'Estantería de 5 niveles en madera de pino tratada. Dimensiones: 180cm alto x 90cm ancho x 30cm profundidad. Diseño moderno minimalista. Fácil ensamble.',
      price: 320000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
      ]),
      category: categorias[3],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[3].id,
    },
    {
      title: 'Aromáticas Medicinales Empacadas 50g',
      description: 'Hierbas aromáticas cultivadas orgánicamente: manzanilla, hierbabuena, toronjil, caléndula. Secado natural y empaque al vacío. Propiedades medicinales certificadas.',
      price: 6000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
      ]),
      category: categorias[0],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[4].id,
    },
    {
      title: 'Mantenimiento de Computadores y Redes',
      description: 'Servicio técnico especializado: mantenimiento preventivo y correctivo de equipos, instalación de redes, configuración de servidores. Incluye diagnóstico gratuito.',
      price: 150000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
      ]),
      category: categorias[4],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[1].id,
    },
    {
      title: 'Joyería en Plata 925',
      description: 'Aretes, collares y pulseras elaborados en plata ley 925. Diseños únicos inspirados en la cultura colombiana. Incluye certificado de autenticidad y estuche de regalo.',
      price: 95000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      ]),
      category: categorias[5],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[3].id,
    },
    {
      title: 'Yogurt Griego Natural 500g',
      description: 'Yogurt tipo griego con alto contenido proteico, elaborado con leche fresca de la región. Sin azúcar añadida, rico en probióticos. Refrigeración requerida.',
      price: 12000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
      ]),
      category: categorias[0],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[4].id,
    },
    {
      title: 'Tapetes Decorativos Tejidos a Mano',
      description: 'Tapetes artesanales tejidos en telar. Fibras naturales de algodón y fique. Diseños geométricos y tradicionales. Dimensiones: 60x90cm. Varios colores disponibles.',
      price: 85000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1604762342529-e86ae0d0ef98?w=800',
      ]),
      category: categorias[5],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[2].id,
    },
    {
      title: 'Escritorio Ejecutivo Ergonómico',
      description: 'Escritorio en MDF con acabado melamínico. Dimensiones: 140x70cm. Incluye organizador de cables, cajón con llave y soporte para CPU. Diseño ergonómico para trabajo prolongado.',
      price: 550000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
      ]),
      category: categorias[3],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[3].id,
    },
    {
      title: 'Embutidos Artesanales Premium',
      description: 'Chorizo, longaniza y morcilla elaborados con carne de cerdo de primera calidad. Condimentación tradicional colombiana. Sin conservantes artificiales. Presentación al vacío 500g.',
      price: 22000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
      ]),
      category: categorias[0],
      status: 'PUBLISHED' as ProductStatus,
      centerId: centrosCreated[0].id,
    },
  ]

  for (const producto of productos) {
    const p = await prisma.product.create({
      data: producto,
    })
    console.log(`✅ Producto creado: ${p.title}`)
  }

  console.log('✅ Seed completado exitosamente!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

