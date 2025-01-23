"use client";
import { usePathname } from "next/navigation";

const links = [
  { name: "Caja", href: "/dashboard/caja" },
  { name: "Fondo Fijo", href: "/dashboard/fondo_fijo" },
];

export default function Nav() {
  const pathname = usePathname();
  
  // Encontrar el enlace activo, o proporcionar un valor predeterminado si no se encuentra
  const activeLink = links.find(link => pathname === link.href);

  // Si no se encuentra un enlace activo, proporcionamos un nombre predeterminado
  const linkName = activeLink ? activeLink.name : "Enlace no encontrado";

  return (
    <nav className="navbar navbar-expand-lg mb-5">
      <div className="container-fluid">
        <h1>{linkName}</h1> {/* Mostrar el nombre del enlace activo */}
      </div>
    </nav>
  );
}

