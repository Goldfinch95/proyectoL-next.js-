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
  const [filteredData, setFilteredData] = useState<Movement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");

  // Indicador para saber si en algún momento se escribió en el input de búsqueda.
  const [searchWasActive, setSearchWasActive] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Actualizamos el indicador de búsqueda.
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setSearchWasActive(true);
    } else {
      // Si se borra el input, reiniciamos el indicador y también los filtros de fechas.
      setSearchWasActive(false);
      setDateFrom(null);
      setDateTo(null);
    }
  }, [searchTerm]);

  // Función para obtener el balance.
  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/movement/balance", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // Suponiendo que el balance viene en result.data.balance.
      setBalance(result.data?.balance || "0");
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance("0");
    }
  }, []);

  // Función que realiza la solicitud según los filtros activos.
  const fetchData = useCallback(async () => {
    try {
      const hasSearch = searchTerm.trim() !== "";
      const hasDates = dateFrom !== null && dateTo !== null;

      let url = "http://localhost:3000/movement";
      let options: RequestInit = { method: "GET" };

      if (hasSearch && hasDates) {
        // Caso 4: Búsqueda y fechas combinadas.
        url = "http://localhost:3000/movement/filter";
        options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin: searchTerm, dateFrom, dateTo }),
        };
      } else if (hasSearch && !hasDates) {
        // Caso 2: Solo búsqueda.
        url = "http://localhost:3000/movement/filter";
        options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin: searchTerm }),
        };
      } else if (!hasSearch && hasDates) {
        // Caso 3: Solo fechas.
        url = "http://localhost:3000/movement/filter";
        options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dateFrom, dateTo }),
        };
      } else {
        // Caso 1: Sin filtros (o reinicio tras borrar búsqueda).
        url = "http://localhost:3000/movement";
        options = { method: "GET" };
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setFilteredData(result.data?.rows || result.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredData([]);
    }
  }, [searchTerm, dateFrom, dateTo]);

  // Inicialización: carga de datos, balance y redirección si es necesario.
  useEffect(() => {
    const initialize = async () => {
      await fetchData();
      await fetchBalance();
      if (pathname === "/dashboard") {
        router.push("/dashboard/caja");
      }
    };
    initialize();
  }, [fetchData, fetchBalance, pathname, router]);

  // Función para actualizar datos manualmente.
  const handleDataUpdated = useCallback(async () => {
    await Promise.all([fetchData(), fetchBalance()]);
  }, [fetchData, fetchBalance]);

  // Manejador para seleccionar fechas desde el calendario.
  const handleDatesSelected = useCallback((start: string, end: string) => {
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 1);
    const adjustedEnd = endDate.toISOString().split("T")[0];
    setDateFrom(start);
    setDateTo(adjustedEnd);
  }, []);

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
              balance={balance}
              onDataUpdated={handleDataUpdated} 
            />
            <TableNav 
              searchTerm={searchTerm}
              
              onSearch={setSearchTerm}
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
      <Crear onDataUpdated={handleDataUpdated} />
    </main>
  );
}
