"use client"

import React, { useState, useEffect } from "react";

import { Poppins } from "next/font/google";

export const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export default function TableComponent() {

   // Estado para los datos de la tabla
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/movement"); 
        const result = await response.json();
        console.log("Datos obtenidos:", result.data.rows);
        setData(result.data.rows); 
      } catch (error) {
        console.error("Error al obtener los datos:", error); 
      }
    };
    fetchData(); 
  }, []);

  //
  const formatDate = (dateString: string) => {
    const date = new Date(dateString); // Convertir el string de fecha a un objeto Date
    return date.toLocaleDateString("es-ES", { // Formato de fecha legible
      day: "2-digit", // Día con 2 dígitos
      month: "short", // Nombre corto del mes (abreviado)
      year: "numeric", // Año con 4 dígitos
    });
  };
 
  // Formatear los gastos con comas
  const formatGasto = (gasto: number) => {
    return gasto.toLocaleString("de-DE");
  };

  return (
    <div>
  <table
    className="table mt-2"
    style={{ fontFamily: poppins.style.fontFamily }}
  >
    <thead>
      <tr>
        <th
          scope="col"
          style={{ backgroundColor: "#f2efea", fontSize: "14px" }}
        >
          <div>
            <span className="d-flex justify-content-lg-start ps-3">Fecha y hora</span>
          </div>
        </th>
        <th
          scope="col"
          style={{ backgroundColor: "#f2efea", fontSize: "14px" }}
        >
          <div>
            <span className="ps-2 me-2 w-auto">Origen</span>
          </div>
        </th>
        <th
          scope="col"
          style={{ backgroundColor: "#f2efea", fontSize: "14px" }}
        >
          <div>
            <span>
            Descripción
            </span>
          </div>
        </th>
        <th
          scope="col"
          style={{ backgroundColor: "#f2efea", fontSize: "14px" }}
        >
          <div>
            <span className="d-flex justify-content-lg-end pe-3">
            Movimiento
            </span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {/* Las filas del cuerpo de la tabla tendrán fondo transparente */}
      {data.map((item, index) => (
        <tr key={index} style={{ backgroundColor: "#fbf9f5" }}>
          <td
            className=""
            style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}
          >
            <span className="px-3 py-4 d-flex justify-content-lg-start ps-3 text-black-50">
            {formatDate(item.date)}
            </span>
          </td>
          <td
            className=""
            style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}
          >
            <span className="px-3 py-4 text-black-50">
              {item.origin}
            </span>
          </td>
          <td
            className=""
            style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}
          >
            <span className="px-3 py-4 text-black-50">
            {item.description}
            </span>
          </td>
          <td
            className=""
            style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}
          >
            <span
              className={`px-3 py-4 d-flex justify-content-lg-end pe-3 ${
                parseFloat(item.amount.replace(",", ".")) > 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              ${item.amount}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}
