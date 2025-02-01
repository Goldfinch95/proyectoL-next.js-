"use client"

import { useEffect, useState, useCallback } from "react";
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
// Estado de los datos para la tabla
const [data, setData] = useState<Movement[]>([]);
// Estado de los datos filtrados para la tabla
const [filteredData, setFilteredData] = useState<Movement[]>([]);
//Estado para el dato de búsqueda.
const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual

  
  // Obtener datos iniciales (sin parámetros)
const fetchData = useCallback(async () => {
  try {
    const response = await fetch("http://localhost:3000/movement");
    const result = await response.json();
    setData(result.data.rows);
    setFilteredData(result.data.rows); // Inicializar con todos los datos
  } catch (error) {
    console.error("Error:", error);
  }
}, []);

/*
  // Función para obtener datos (con o sin filtro)
  const fetchData = useCallback(async (term?: string) => {
    try {
      const url = term 
        ? `http://localhost:3000/movement?origin=${encodeURIComponent(term)}`
        : "http://localhost:3000/movement";
      
      const response = await fetch(url);
      const result = await response.json();
      setData(result.data.rows);
      setFilteredData(result.data.rows); // Actualiza datos filtrados
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }, []);
*/

// Filtrar solo en cliente
useEffect(() => {
  const filtered = searchTerm
    ? data.filter(m => m.origin.toLowerCase().includes(searchTerm.toLowerCase()))
    : data;
  
  setFilteredData(filtered);
}, [searchTerm, data]);
/*
   // Filtrado en el cliente al cambiar searchTerm
   useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter(movement => 
        movement.origin.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Si no hay término, muestra todos
    }
  }, [searchTerm, data]); // <-- Se ejecuta cuando cambia searchTerm o data
*/
  // Efecto inicial y redirección
  useEffect(() => {
    if (pathname === "/dashboard") router.push("/dashboard/caja");
    fetchData();
  }, []);
  
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
            <Boxes onDataUpdated={handleDataUpdated} />
            <TableNav searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
          />
            <div>
            </div>
          </div>
          <div>
          <TableComponent data={filteredData}  onDataUpdated={handleDataUpdated} />
          </div>
        </div>
      </div>
      <Calendar />
      <Ingresar />
      <Crear onDataUpdated={handleDataUpdated} />
    </main>
  );
}

