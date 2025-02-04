"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
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
  const [data, setData] = useState<Movement[]>([]);
  const [filteredData, setFilteredData] = useState<Movement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [apiData, setApiData] = useState<Movement[]>([]);
  const [balance, setBalance] = useState<string>("0"); // Nuevo estado para el balance

  const router = useRouter();
  const pathname = usePathname();

  const handleDatesSelected = (start: string, end: string) => {
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 1);
    const adjustedEnd = endDate.toISOString().split("T")[0];
  
    setDateFrom(start);
    setDateTo(adjustedEnd);
  };

  // Función para obtener el balance
  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/movement/balance");
      const result = await response.json();
      setBalance(result.data.balance);
    } catch (error) {
      console.error("Error obteniendo balance:", error);
    }
  }, []);

  // Función para actualizar todos los datos
  const handleDataUpdated = useCallback(async () => {
    try {
      // Actualizar movimientos
      const movementsResponse = await fetch("http://localhost:3000/movement");
      const movementsResult = await movementsResponse.json();
      setData(movementsResult.data.rows);
      setFilteredData(movementsResult.data.rows);

      // Actualizar balance
      await fetchBalance();

      // Actualizar datos filtrados si es necesario
      if (searchTerm || (dateFrom && dateTo)) {
        await fetchFilteredData();
      }
    } catch (error) {
      console.error("Error actualizando datos:", error);
    }
  }, [searchTerm, dateFrom, dateTo, fetchBalance]);

  // Función para filtrado
  const fetchFilteredData = useCallback(async () => {
    try {
      const body = {
        origin: searchTerm,
        dateFrom: dateFrom || "",
        dateTo: dateTo || ""
      };

      const response = await fetch("http://localhost:3000/movement/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const result = await response.json();
      const sortedData = result.data.sort((a: Movement, b: Movement) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setApiData(sortedData);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setApiData([]);
    }
  }, [searchTerm, dateFrom, dateTo]);

  // Efecto inicial para carga de datos
  useEffect(() => {
    const initializeData = async () => {
      await handleDataUpdated();
      if (pathname === "/dashboard") {
        router.push("/dashboard/caja");
      }
    };
    initializeData();
  }, []);

  // Efecto para búsqueda y filtrado
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...data];
      
      if (searchTerm) {
        filtered = filtered.filter(m => 
          m.origin.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (dateFrom && dateTo) {
        const startDate = new Date(dateFrom);
        const endDate = new Date(dateTo);
        filtered = filtered.filter(m => {
          const movementDate = new Date(m.date);
          return movementDate >= startDate && movementDate <= endDate;
        });
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [searchTerm, dateFrom, dateTo, data]);

  return (
    <main className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-2 col-sm-3 col-xl-2" style={{ backgroundColor: "#fbf9f5" }}>
          <div className="sticky-top">
            <SideNav />
          </div>
        </div>
        <div className="col-10 col-sm-9 col-xl-10 m-0" style={{ backgroundColor: "#fbf9f5" }}>
          <div className="sticky-top" style={{ backgroundColor: "#fbf9f5" }}>
            <Nav />
            <Boxes 
              balance={balance}  // Pasamos el balance como prop
              onDataUpdated={handleDataUpdated} 
            />
            <TableNav 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              onSearch={(term: string) => setSearchTerm(term)}
            />
          </div>
          <div>
            <TableComponent
              data={filteredData} 
              onDataUpdated={handleDataUpdated}
            />
          </div>
        </div>
      </div>
      <Calendar onDatesSelected={handleDatesSelected} />
      <Ingresar />
      <Crear onDataUpdated={handleDataUpdated} />
    </main>
  );
}
