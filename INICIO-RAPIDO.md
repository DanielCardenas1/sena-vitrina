# ⚡ Inicio Ultra Rápido

¿Tienes Node.js instalado? Usa este script para configurar todo automáticamente:

## En Windows (PowerShell)

```powershell
# Navega a la carpeta del proyecto
cd sena-vitrina

# Ejecuta el script de setup
.\setup.ps1
```

Si te da error de permisos, ejecuta esto primero:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## O hazlo manualmente:

```powershell
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

---

## ¿No tienes Node.js?

1. Descarga desde: https://nodejs.org/
2. Instala la versión LTS
3. Reinicia PowerShell
4. Ejecuta `setup.ps1`

---

¡Listo! Abre http://localhost:3000 🚀
