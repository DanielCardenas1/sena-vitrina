'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

type FiltersProps = {
  regions: Array<{ id: string; name: string }>
  centers: Array<{ id: string; name: string; regionId: string }>
  categories: string[]
}

export function FiltersBar({ regions, centers, categories }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('regionId') || '')
  const [selectedCenter, setSelectedCenter] = useState(searchParams.get('centerId') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')

  const filteredCenters = selectedRegion
    ? centers.filter(c => c.regionId === selectedRegion)
    : centers

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (selectedRegion) params.set('regionId', selectedRegion)
    if (selectedCenter) params.set('centerId', selectedCenter)
    if (selectedCategory) params.set('category', selectedCategory)
    
    const query = params.toString()
    router.push(query ? `/products?${query}` : '/products')
  }, [search, selectedRegion, selectedCenter, selectedCategory, router])

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setSelectedCenter('') // Reset center when region changes
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <select
          value={selectedRegion}
          onChange={(e) => handleRegionChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Todas las regionales</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          disabled={!selectedRegion && centers.length > 10}
        >
          <option value="">Todos los centros</option>
          {filteredCenters.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
