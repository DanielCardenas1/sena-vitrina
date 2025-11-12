# SENA Vitrina Nacional - Guía de Instalación

## ⚠️ IMPORTANTE: Instalar Node.js primero

Este proyecto requiere **Node.js 18 o superior**. Si aún no lo tienes instalado:

### Descargar Node.js:
1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador y sigue las instrucciones
4. Reinicia tu terminal/PowerShell después de instalar

### Verificar instalación:
```powershell
node --version
npm --version
```

Deberías ver algo como:
```
v20.x.x
10.x.x
```

---

## 🚀 Pasos de Instalación

Una vez que Node.js esté instalado, ejecuta estos comandos en PowerShell dentro de la carpeta `sena-vitrina`:

### 1. Instalar dependencias
```powershell
npm install
```

### 2. Configurar Prisma
```powershell
npm run prisma:generate
```

### 3. Crear la base de datos
```powershell
npm run prisma:migrate
```

### 4. Cargar datos de ejemplo
```powershell
npm run prisma:seed
```

### 5. Iniciar el proyecto
```powershell
npm run dev
```

### 6. Abrir en el navegador
```
http://localhost:3000
```

---

## ✅ Verificar que todo funciona

Si ves el sitio web en el navegador con:
- Página de inicio con el hero de SENA
- Lista de productos en `/products`
- Panel admin en `/admin/products`

¡Todo está funcionando correctamente! 🎉

---

## 📌 Comandos útiles

```powershell
# Ver la base de datos visualmente
npm run prisma:studio

# Reiniciar datos de ejemplo
npm run prisma:seed

# Verificar errores de código
npm run lint

# Compilar para producción
npm run build
```

---

## 🆘 Solución de Problemas

### Error: "npm no se reconoce"
**Solución**: Necesitas instalar Node.js (ver sección de arriba)

### Error en las migraciones
**Solución**: 
```powershell
# Elimina la carpeta prisma/migrations y el archivo dev.db
Remove-Item -Recurse -Force prisma\migrations
Remove-Item -Force prisma\dev.db

# Vuelve a ejecutar
npm run prisma:migrate
npm run prisma:seed
```

### Puerto 3000 ocupado
**Solución**: 
```powershell
# Usa otro puerto
$env:PORT=3001; npm run dev
```

### Errores de TypeScript
**Solución**: Son normales antes de instalar las dependencias. Se resolverán después de `npm install`.

---

## 📚 Recursos

- **Documentación Next.js**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

---

**¿Listo para empezar?** 🚀

1. Instala Node.js
2. Ejecuta `npm install`
3. Ejecuta `npm run prisma:generate`
4. Ejecuta `npm run prisma:migrate`
5. Ejecuta `npm run prisma:seed`
6. Ejecuta `npm run dev`
7. Abre http://localhost:3000

¡Eso es todo!
