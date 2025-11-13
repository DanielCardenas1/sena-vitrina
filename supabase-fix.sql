-- Crear el enum ProductStatus si no existe
DO $$ BEGIN
    CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Actualizar la columna status en la tabla Product
ALTER TABLE "Product" 
ALTER COLUMN status TYPE "ProductStatus" 
USING status::"ProductStatus";

-- Verificar que los datos están correctos
SELECT id, title, status FROM "Product" LIMIT 5;
