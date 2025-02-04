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

  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    setSearchTerm(term);  // Actualiza el searchTerm
    const filtered = term.trim() === "" 
      ? (apiData.length > 0 ? apiData : data)
      : (apiData.length > 0 ? apiData : data).filter((m) =>
          m.origin.toLowerCase().includes(term.toLowerCase())
        );
    setFilteredData(filtered);  // Filtra los datos según el término de búsqueda
  };

  const handleDatesSelected = (start: string, end: string) => {
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 1);
    const adjustedEnd = endDate.toISOString().split("T")[0];
  
    setDateFrom(start);
    setDateTo(adjustedEnd);
  };

  const fetchFilteredData = useCallback(async () => {
    try {
      let body: any = {};
  
      if (searchTerm) {
        body = { origin: searchTerm, dateFrom: "", dateTo: "" };
      } else if (dateFrom && dateTo) {
        body = { dateFrom, dateTo, origin: "" };
      } else {
        return;
      }
  
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

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/movement");
      const result = await response.json();
      setData(result.data.rows);
      setFilteredData(result.data.rows);
      fetchFilteredData(); 
    } catch (error) {
      console.error("Error:", error);
    }
  }, [fetchFilteredData]);

  useEffect(() => {
    const filtered = searchTerm.trim() === "" 
      ? (apiData.length > 0 ? apiData : data)
      : (apiData.length > 0 ? apiData : data).filter((m) =>
          m.origin.toLowerCase().includes(searchTerm.toLowerCase())
        );
    setFilteredData(filtered);
  }, [searchTerm, data, apiData]);

  useEffect(() => {
    if (pathname === "/dashboard") {
      router.push("/dashboard/caja");
    }
  }, [pathname, router]);

  const handleDataUpdated = () => {
    fetchData();
    fetchFilteredData(); 
  };

  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  useEffect(() => {
    if (dateFrom && dateTo) {
      const filtered = (apiData.length > 0 ? apiData : data)
        .filter((m) => {
          const movementDate = new Date(m.date);
          const startDate = new Date(dateFrom);
          const endDate = new Date(dateTo);

          return movementDate >= startDate && movementDate <= endDate;
        })
        .filter((m) => {
          return searchTerm.trim() === ""
            ? true
            : m.origin.toLowerCase().includes(searchTerm.toLowerCase());
        });

      setFilteredData(filtered);
    }
  }, [searchTerm, dateFrom, dateTo, apiData, data]);

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
            <Boxes onDataUpdated={handleDataUpdated} />
            <TableNav 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              onSearch={handleSearch}  // Asegúrate de pasar la función handleSearch
            />
            <div></div>
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
