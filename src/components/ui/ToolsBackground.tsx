import React from 'react'
import Image from 'next/image'

export const ToolsBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/images/ChatGPT Image 14 oct 2025, 17_18_46.png"
        alt="Herramientas y construcción"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay para mejor contraste del texto */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/70 to-primary-800/70"></div>
    </div>
  )
}
