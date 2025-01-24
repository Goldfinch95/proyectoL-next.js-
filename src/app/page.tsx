"use client"

import Image from "next/image";
import { useEffect } from 'react';


export default function Home() {  
  return (
    <main>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Image
          src="/website_under_construction.webp" // Ruta del archivo en la carpeta public
          alt="Página en construcción"
          layout="fill" // Hace que la imagen ocupe todo el contenedor
          objectFit="contain" // Ajusta la imagen sin recortar, manteniendo su proporción
        />
      </div>
    </main>
    )
}

