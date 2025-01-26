"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Importamos usePathname
import SideNav from "../ui/dashboard/sidenav";
import Nav from "../ui/dashboard/nav";
import Boxes from "../ui/dashboard/boxes";
import TableNav from "../ui/dashboard/tablenav";
import Calendar from "../ui/dashboard/modals/calendar";
import Ingresar from "../ui/dashboard/modals/ingresar";
import Crear from "../ui/dashboard/modals/crear";
import TableComponent from "../ui/dashboard/table";

interface Movement {
  id: string;
  description: string;
  amount: string;
  date: string;
  origin: string;
  createdAt: string;
  updatedAt: string;
}

export default function Layout() {

  const router = useRouter();
  const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual

  // Estado de los datos para la tabla
  const [data, setData] = useState<any[]>([]);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/movement");
      const result = await response.json();
      setData(result.data.rows); // Establecemos los datos en el estado
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Redirigir a /dashboard/caja si estamos en /dashboard
  useEffect(() => {
    if (pathname === "/dashboard") {
      router.push("/dashboard/caja");
    }
  }, [pathname, router]);

  // Esta función será llamada cuando se añadan nuevos datos desde el modal
  const handleDataUpdated = () => {
    fetchData(); // Recargar los datos
  };

  useEffect(() => {
    fetchData(); // Obtener los datos al cargar la página
  }, []);

  return (
    <main className="container-fluid">
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-2 col-sm-3 col-xl-2" style={{ backgroundColor: '#fbf9f5' }}>
          <div className="sticky-top">
            <SideNav />
          </div>
        </div>
        <div className="col-10 col-sm-9 col-xl-10 m-0" style={{ backgroundColor: '#fbf9f5' }}>
          <div className="sticky-top" style={{ backgroundColor: '#fbf9f5' }}>
            <Nav />
            <Boxes />
            <TableNav />
            <div>
            </div>
          </div>
          <div>
          <TableComponent data={data} />
          </div>
        </div>
      </div>
      <Calendar />
      <Ingresar />
      <Crear onDataUpdated={handleDataUpdated} />
    </main>
  );
}

