import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

export const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export default function TableComponent() {
  // Estado para los datos de la tabla
  const [data, setData] = useState<
    { fecha: string; item: string; gasto: number }[]
  >([]);
  // Datos estáticos de la tabla (tableItems)
  const tableItems = [
    { fecha: "05 oct 2022 14:30", item: "Chino", gasto: 3000 },
    { fecha: "05 feb 2024 10:00", item: "Libreria", gasto: 7400000 },
    { fecha: "10 mar 2024 08:45", item: "Chino", gasto: 1000 },
    { fecha: "15 abr 2024 12:20", item: "Agua", gasto: 380000 },
    { fecha: "20 may 2024 16:30", item: "Chino", gasto: -3900 },
    { fecha: "25 jun 2024 11:15", item: "Chino", gasto: 260000 },
    { fecha: "30 jul 2024 09:00", item: "Libreria", gasto: 1300 },
    { fecha: "04 ago 2024 17:40", item: "Libreria", gasto: 3800 },
    { fecha: "09 sep 2024 18:00", item: "Agua", gasto: 150000 },
    { fecha: "14 oct 2024 07:00", item: "Chino", gasto: 3000 },
    { fecha: "19 nov 2024 10:30", item: "Libreria", gasto: 7400 },
    { fecha: "24 dic 2024 13:50", item: "Chino", gasto: 1000 },
    { fecha: "01 ene 2025 08:00", item: "Agua", gasto: -380000 },
    { fecha: "05 feb 2025 09:30", item: "Chino", gasto: 3900 },
    { fecha: "10 mar 2025 14:00", item: "Chino", gasto: 2600 },
    { fecha: "15 abr 2025 16:20", item: "Libreria", gasto: 1300 },
    { fecha: "20 may 2025 18:10", item: "Libreria", gasto: 3800 },
    { fecha: "25 jun 2025 12:30", item: "Agua", gasto: 1500 },
    { fecha: "30 jul 2025 14:40", item: "Chino", gasto: 3000000 },
    { fecha: "04 ago 2025 10:10", item: "Libreria", gasto: 7400000 },
    { fecha: "09 sep 2025 15:00", item: "Chino", gasto: -1000 },
    { fecha: "14 oct 2025 17:50", item: "Agua", gasto: 3800 },
    { fecha: "19 nov 2025 09:00", item: "Chino", gasto: 390000 },
    { fecha: "24 dic 2025 12:20", item: "Chino", gasto: 2600 },
    { fecha: "31 dic 2025 11:30", item: "Libreria", gasto: 130000 },
    { fecha: "01 ene 2026 10:00", item: "Libreria", gasto: 3800 },
    { fecha: "05 feb 2026 14:30", item: "Agua", gasto: 150000 },
  ];

  // Efecto para cargar los datos
  useEffect(() => {
    setData(tableItems);
  }, []);

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
          {/* Primer tr con fondo negro */}
          <tr>
            <th
              scope="col"
              className="d-flex"
              style={{ backgroundColor: "#f2efea", fontSize: "14px" }}
            >
              <div className="d-flex align-items-center">
                <span className="ps-2 me-2 pe-2">Fecha y hora</span>
              </div>
            </th>
            <th
              scope="col"
              style={{ backgroundColor: "#f2efea", fontSize: "14px" }}
            >
              <div className="d-flex">
                <span className="me-2 pe-2 w-auto">Cuenta</span>
              </div>
            </th>
            <th
              scope="col"
              style={{ backgroundColor: "#f2efea", fontSize: "14px" }}
            >
              <div className="d-flex align-items-center justify-content-end">
                <span className="me-2 pe-2 d-flex justify-content-end">
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
                className="px-3 py-4 d-flex"
                style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}
              >
                <span className="d-flex justify-content-start text-black-50">
                  {item.fecha}
                </span>
              </td>
              <td
                className="px-3 py-4 text-center"
                style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}
              >
                <span className="d-flex justify-content-start text-black-50">
                  {item.item}
                </span>
              </td>
              <td
                className="d-flex justify-content-end px-3 py-4"
                style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}
              >
                <span
                  className={`d-flex justify-content-end ${
                    item.gasto > 0 ? "text-success" : "text-danger"
                  }`}
                >
                  ${formatGasto(item.gasto)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
