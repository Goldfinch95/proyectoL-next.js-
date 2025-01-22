"use client";
import { usePathname } from "next/navigation";

const links = [
  { name: "Caja", href: "/dashboard/caja",  },
  { name: "Fondo Fijo", href: "/dashboard/fondo_fijo", },
];

export default function Nav() {
    const pathname = usePathname();
    const activeLink = links.find(link => pathname === link.href)
  return (
    <nav className="navbar navbar-expand-lg mb-5">
    <div className="container-fluid">
      <h1>{activeLink.name}</h1>
    </div>
  </nav>
  );
}
