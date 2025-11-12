'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

type RequestFormProps = {
  productId: string
  productTitle: string
}

export function RequestForm({ productId, productTitle }: RequestFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar la solicitud')
      }

      toast.success('¡Solicitud enviada con éxito!', {
        description: 'El centro se pondrá en contacto contigo pronto.',
      })

      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error('Error al enviar la solicitud', {
        description: error instanceof Error ? error.message : 'Intenta de nuevo',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nombre completo <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Teléfono
        </label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="300 123 4567"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Mensaje o consulta
        </label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe tu interés en este producto..."
          rows={4}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-sena-orange to-sena-green hover:from-sena-orange-dark hover:to-sena-green-dark text-white font-semibold text-base py-6 rounded-lg shadow-md hover:shadow-lg transition-all" 
        disabled={loading}
      >
        {loading ? 'Enviando...' : '📨 Enviar Solicitud'}
      </Button>

      <p className="text-xs text-gray-600 text-center">
        Al enviar, aceptas que el centro se ponga en contacto contigo sobre: <strong className="text-sena-orange">{productTitle}</strong>
      </p>
    </form>
  )
}
