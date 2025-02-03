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
//Estados para el filtro de la tabla.
const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
//datos filtrados con calendario
const [apiData, setApiData] = useState<any[]>([]);



  const router = useRouter();
  const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual

  const handleDatesSelected = (start: string, end: string) => {
    setDateFrom(start);
    setDateTo(end);
    // Logs con formato
    //console.log(dateFrom);
    //console.log(dateTo);
  };

  //obtener datos filtrados
  useEffect(() => {
    const fetchData = async () => {
      if (!dateFrom || !dateTo) return;

      try {
        const response = await fetch('http://localhost:3000/movement/filter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dateFrom,
            dateTo,
            origin: "" // Valor estático según tu ejemplo
          }),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos recibidos de la API:', data);
        setApiData(data);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [dateFrom, dateTo]); // Se ejecuta cuando cambian las fechas

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



// Filtrar solo en cliente
useEffect(() => {
  const filtered = searchTerm
    ? data.filter(m => m.origin.toLowerCase().includes(searchTerm.toLowerCase()))
    : data;
  
  setFilteredData(filtered);
}, [searchTerm, data]);
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
          <TableComponent data={data}  onDataUpdated={handleDataUpdated} />
          </div>
        </div>
      </div>
      <Calendar onDatesSelected={handleDatesSelected} />
      <Ingresar />
      <Crear onDataUpdated={handleDataUpdated} />
    </main>
  );
}

