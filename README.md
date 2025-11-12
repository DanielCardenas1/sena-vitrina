# 🎯 SENA Vitrina Nacional de Producción de Centros

Marketplace oficial para productos y servicios de los Centros de Formación SENA en Colombia.

## 📋 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Base de Datos**: SQLite (local) / PostgreSQL (producción)
- **ORM**: Prisma
- **Deploy**: Vercel

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ y npm
- Git

### Instalación

1. **Clonar el repositorio** (o usar el proyecto existente):
```bash
cd sena-vitrina
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
# Copia el archivo de ejemplo
copy .env.example .env

# El archivo .env ya contiene:
# DATABASE_URL="file:./dev.db"
```

4. **Configurar la base de datos**:
```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Cargar datos de ejemplo
npm run prisma:seed
```

5. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

6. **Abrir en el navegador**:
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
sena-vitrina/
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   └── seed.ts                # Datos de ejemplo
├── src/
│   ├── app/
│   │   ├── api/               # Rutas API
│   │   │   ├── products/
│   │   │   ├── requests/
│   │   │   ├── centers/
│   │   │   └── regions/
│   │   ├── products/          # Páginas de productos
│   │   │   ├── [id]/         # Detalle de producto
│   │   │   └── page.tsx      # Lista de productos
│   │   ├── admin/             # Panel de administración
│   │   │   └── products/
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes de shadcn/ui
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── FiltersBar.tsx
│   │   ├── RequestForm.tsx
│   │   └── ProductForm.tsx
│   └── lib/
│       ├── prisma.ts         # Cliente de Prisma
│       └── utils.ts          # Utilidades
└── package.json
```

## 🎨 Funcionalidades

### Público
- ✅ Explorar productos por categoría, centro y regional
- ✅ Búsqueda de productos
- ✅ Ver detalle completo de productos
- ✅ Formulario de solicitud de información
- ✅ Responsive design

### Administración
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Cambiar estado (DRAFT/PUBLISHED)
- ✅ Ver todas las solicitudes

## 🗄️ Modelo de Datos

### Region
- `id`: String (CUID)
- `name`: String (único)
- `centers`: Relación con Center[]

### Center
- `id`: String (CUID)
- `name`: String
- `regionId`: String
- `contactEmail`: String? (opcional)
- `contactPhone`: String? (opcional)
- `products`: Relación con Product[]

### Product
- `id`: String (CUID)
- `title`: String
- `description`: String
- `price`: Int? (opcional, en COP)
- `images`: String (JSON array de URLs)
- `category`: String
- `status`: ProductStatus (DRAFT | PUBLISHED)
- `centerId`: String
- `requests`: Relación con Request[]

### Request
- `id`: String (CUID)
- `name`: String
- `email`: String
- `phone`: String? (opcional)
- `message`: String? (opcional)
- `productId`: String

## 🔌 API Endpoints

### Productos
- `GET /api/products` - Listar productos (con filtros)
- `POST /api/products` - Crear producto
- `GET /api/products/[id]` - Detalle de producto
- `PATCH /api/products/[id]` - Actualizar producto
- `DELETE /api/products/[id]` - Eliminar producto

### Solicitudes
- `GET /api/requests` - Listar solicitudes
- `POST /api/requests` - Crear solicitud

### Otros
- `GET /api/centers` - Listar centros
- `GET /api/regions` - Listar regionales

## 📊 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo

# Producción
npm run build            # Compilar para producción
npm start                # Iniciar servidor de producción

# Base de datos
npm run prisma:generate  # Generar cliente de Prisma
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:studio    # Abrir Prisma Studio (GUI)
npm run prisma:seed      # Cargar datos de ejemplo

# Calidad de código
npm run lint             # Ejecutar ESLint
```

## 🌐 Deploy en Vercel

### 1. Preparar el repositorio
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <tu-repo-url>
git push -u origin main
```

### 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio de GitHub
3. Configura las variables de entorno:

```env
# Opción 1: PostgreSQL (Supabase)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Opción 2: SQLite (Turso)
DATABASE_URL="libsql://[your-database].turso.io"
TURSO_AUTH_TOKEN="your-auth-token"
```

### 3. Deploy
Vercel automáticamente:
- Instala dependencias
- Genera el cliente de Prisma
- Compila el proyecto
- Despliega

### 4. Ejecutar migraciones en producción
```bash
# Desde tu terminal local (con DATABASE_URL de producción en .env)
npx prisma migrate deploy
npx prisma db seed
```

## 🔧 Configuración de Base de Datos en Producción

### Opción A: Supabase (PostgreSQL - Recomendado)

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Obtener connection string desde Settings > Database
3. Agregar a Vercel:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
```

4. Actualizar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Cambiar de sqlite
  url      = env("DATABASE_URL")
}
```

### Opción B: Turso (SQLite en la nube)

1. Crear cuenta en [turso.tech](https://turso.tech)
2. Crear base de datos:
```bash
turso db create sena-vitrina
```

3. Obtener URL y token:
```bash
turso db show sena-vitrina --url
turso db tokens create sena-vitrina
```

## 🎯 Próximos Pasos

### Mejoras Sugeridas
- [ ] Autenticación con NextAuth (roles DG/Centro)
- [ ] Carga de imágenes a Cloudinary/Uploadthing
- [ ] Notificaciones por email (Nodemailer/Resend)
- [ ] Paginación de productos
- [ ] Sistema de favoritos
- [ ] Estadísticas y analytics
- [ ] Búsqueda avanzada con Algolia
- [ ] Exportar solicitudes a Excel

### Seguridad
- [ ] Rate limiting en APIs
- [ ] Validación con Zod
- [ ] Sanitización de inputs
- [ ] CORS configurado
- [ ] Protección CSRF

## 📝 Datos de Ejemplo

El seed incluye:
- 3 Regionales (Bogotá, Antioquia, Valle)
- 5 Centros de formación
- 12 Productos en diversas categorías:
  - Alimentos y Bebidas
  - Textiles y Confecciones
  - Tecnología e Innovación
  - Muebles y Carpintería
  - Servicios Profesionales
  - Artesanías

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto para uso del SENA.

## 👥 Créditos

Desarrollado para la Dirección General del SENA - Vitrina Nacional de Producción de Centros.

---

**¿Necesitas ayuda?** Contacta al equipo de desarrollo o revisa la documentación de:
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
