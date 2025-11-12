# 🚀 Guía de Deploy en Vercel

## Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `sena-vitrina` (o el que prefieras)
3. Visibilidad: Privado o Público
4. **NO** inicialices con README, .gitignore o licencia
5. Clic en "Create repository"

### 1.2 Subir tu código
Desde PowerShell en la carpeta del proyecto:

```powershell
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: SENA Vitrina Nacional"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/sena-vitrina.git

# Subir el código
git branch -M main
git push -u origin main
```

---

## Paso 2: Deploy en Vercel

### 2.1 Crear cuenta en Vercel
1. Ve a https://vercel.com/signup
2. Regístrate con tu cuenta de GitHub
3. Autoriza a Vercel a acceder a tus repositorios

### 2.2 Importar proyecto
1. Clic en "Add New..." → "Project"
2. Busca tu repositorio `sena-vitrina`
3. Clic en "Import"

### 2.3 Configurar el proyecto
En la pantalla de configuración:

**Framework Preset**: Next.js (detectado automáticamente)

**Build Command**: 
```bash
npm run build
```

**Output Directory**: 
```
.next
```

**Install Command**: 
```bash
npm install
```

### 2.4 Variables de Entorno (Importante!)

#### Opción A: SQLite con Turso (Más fácil)

1. Crea cuenta en https://turso.tech
2. Instala CLI:
```powershell
# En Windows (con Scoop)
scoop install turso

# O descarga desde: https://github.com/tursodatabase/turso-cli/releases
```

3. Crea base de datos:
```powershell
turso db create sena-vitrina
```

4. Obtén la URL:
```powershell
turso db show sena-vitrina --url
```

5. Crea token:
```powershell
turso db tokens create sena-vitrina
```

6. En Vercel, agrega estas variables:
```
DATABASE_URL = libsql://tu-database.turso.io
TURSO_AUTH_TOKEN = tu-token-aqui
```

#### Opción B: PostgreSQL con Supabase (Recomendado para producción)

1. Crea cuenta en https://supabase.com
2. Crea un nuevo proyecto
3. Ve a Settings > Database
4. Copia la "Connection string" (modo URI)
5. En Vercel, agrega:
```
DATABASE_URL = postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

**IMPORTANTE**: Si usas PostgreSQL, actualiza `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Cambiar de "sqlite"
  url      = env("DATABASE_URL")
}
```

Y haz commit:
```powershell
git add prisma/schema.prisma
git commit -m "Cambiar a PostgreSQL"
git push
```

---

## Paso 3: Deploy

1. Clic en **"Deploy"**
2. Vercel automáticamente:
   - Clona tu repositorio
   - Instala dependencias
   - Genera cliente de Prisma
   - Compila Next.js
   - Despliega

3. Espera 2-3 minutos

4. Verás: **"Congratulations! Your project has been deployed!"**

---

## Paso 4: Ejecutar Migraciones en Producción

### 4.1 Instalar Vercel CLI (Opcional pero recomendado)
```powershell
npm install -g vercel
```

### 4.2 Ejecutar migraciones

**Opción 1: Desde terminal local**

1. Copia las variables de entorno de Vercel:
   - Ve a tu proyecto en Vercel
   - Settings > Environment Variables
   - Copia `DATABASE_URL` y otros

2. Crea archivo `.env.production.local`:
```env
DATABASE_URL="tu-database-url-de-produccion"
```

3. Ejecuta migraciones:
```powershell
# Generar cliente
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Cargar datos de ejemplo
npx prisma db seed
```

**Opción 2: Desde Vercel CLI**

```powershell
# Autenticarte
vercel login

# Vincular proyecto
vercel link

# Ejecutar comando en producción
vercel env pull .env.production

# Luego ejecuta las migraciones con la .env.production
```

---

## Paso 5: Verificar el Deploy

1. Ve a la URL de tu proyecto (ej: `https://sena-vitrina.vercel.app`)
2. Verifica que funcione:
   - ✅ Página de inicio carga
   - ✅ `/products` muestra productos
   - ✅ `/admin/products` funciona
   - ✅ Puedes crear productos

---

## 🔄 Deploy Automático

Cada vez que hagas `git push` a la rama `main`, Vercel automáticamente:
1. Detecta el cambio
2. Ejecuta el build
3. Despliega la nueva versión

**Para hacer cambios**:
```powershell
# Edita archivos
git add .
git commit -m "Descripción del cambio"
git push

# Vercel desplegará automáticamente en ~2 min
```

---

## 🎯 URLs del Proyecto

Después del deploy tendrás:

- **Producción**: `https://tu-proyecto.vercel.app`
- **Preview**: Cada PR/commit genera una URL temporal
- **Dashboard**: `https://vercel.com/tu-usuario/sena-vitrina`

---

## 🔧 Configuración Adicional (Opcional)

### Dominio personalizado
1. En Vercel Dashboard → Settings → Domains
2. Agregar dominio (ej: `vitrina.sena.edu.co`)
3. Configurar DNS según instrucciones

### Analytics
1. En Vercel Dashboard → Analytics
2. Activar para ver estadísticas de tráfico

### Variables de entorno por ambiente
```
Production: Variables que usará en producción
Preview: Variables para branches de prueba
Development: Variables locales (archivo .env)
```

---

## ❗ Troubleshooting

### Error: "Failed to compile"
- Revisa los logs en Vercel Dashboard
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `npm run build` funcione localmente

### Error: "Database connection failed"
- Verifica que `DATABASE_URL` esté correcta en Variables de Entorno
- Verifica que la base de datos esté accesible públicamente
- Revisa los logs de la base de datos

### Error: "Prisma client not generated"
- Vercel debe ejecutar `prisma generate` automáticamente
- Verifica que `prisma` esté en `devDependencies`
- Agrega script en `package.json`:
```json
"postinstall": "prisma generate"
```

### Tabla vacía después del deploy
- No olvides ejecutar `npx prisma db seed` con la URL de producción
- O crear productos manualmente desde `/admin/products/new`

---

## 📚 Recursos

- **Vercel Docs**: https://vercel.com/docs
- **Prisma Deploy**: https://www.prisma.io/docs/guides/deployment
- **Turso Docs**: https://docs.turso.tech
- **Supabase Docs**: https://supabase.com/docs

---

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Primera versión desplegada
- [ ] Migraciones ejecutadas en producción
- [ ] Datos de ejemplo cargados
- [ ] URLs funcionando correctamente
- [ ] (Opcional) Dominio personalizado configurado

¡Listo! Tu marketplace SENA está en producción 🎉
