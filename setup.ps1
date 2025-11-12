# 🚀 Script de Inicio Rápido - SENA Vitrina
# Ejecuta este script para configurar todo automáticamente

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  SENA Vitrina Nacional - Setup     " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "[1/6] Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor descarga e instala Node.js desde: https://nodejs.org/" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

# Instalar dependencias
Write-Host ""
Write-Host "[2/6] Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
    pause
    exit 1
}

# Generar cliente Prisma
Write-Host ""
Write-Host "[3/6] Generando cliente Prisma..." -ForegroundColor Yellow
npm run prisma:generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Cliente Prisma generado" -ForegroundColor Green
} else {
    Write-Host "✗ Error al generar cliente Prisma" -ForegroundColor Red
    pause
    exit 1
}

# Ejecutar migraciones
Write-Host ""
Write-Host "[4/6] Creando base de datos..." -ForegroundColor Yellow
npm run prisma:migrate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Base de datos creada" -ForegroundColor Green
} else {
    Write-Host "✗ Error al crear base de datos" -ForegroundColor Red
    pause
    exit 1
}

# Cargar datos de ejemplo
Write-Host ""
Write-Host "[5/6] Cargando datos de ejemplo..." -ForegroundColor Yellow
npm run prisma:seed
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Datos cargados exitosamente" -ForegroundColor Green
} else {
    Write-Host "✗ Error al cargar datos" -ForegroundColor Red
    pause
    exit 1
}

# Resumen
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  ✓ Setup completado exitosamente   " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "El proyecto está listo!" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar el servidor:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Luego abre en tu navegador:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Comandos útiles:" -ForegroundColor Yellow
Write-Host "  npm run prisma:studio  - Ver base de datos" -ForegroundColor White
Write-Host "  npm run build          - Compilar para producción" -ForegroundColor White
Write-Host ""

Write-Host "[6/6] ¿Quieres iniciar el servidor ahora? (S/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq 'S' -or $response -eq 's') {
    Write-Host ""
    Write-Host "Iniciando servidor..." -ForegroundColor Green
    Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "Puedes iniciar el servidor cuando quieras con: npm run dev" -ForegroundColor Green
    Write-Host ""
}
