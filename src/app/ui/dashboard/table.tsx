"use client";
import React, { useState } from "react";
import Edit from "./modals/edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
import styles from "./table.module.css";

export const poppins = Poppins({ weight: "600", subsets: ["latin"] });

interface DataItem {
  id: string;
  date: string;
  origin: string;
  description: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
}

interface TableComponentProps {
  data: DataItem[];
  onDataUpdated: () => void;
}

export default React.memo(function TableComponent({
  data,
  onDataUpdated,
}: TableComponentProps) {
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const handleEditClick = (item: DataItem) => {
    setSelectedItem(item);
  };

  const deleteMovement = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/movement/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        onDataUpdated();
      } else {
        console.error("Error al eliminar el movimiento");
      }
    } catch (error) {
      console.error("Error al eliminar el movimiento:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatNumber = (numberString: string) => {
    const parsedNumber = parseFloat(numberString.replace(",", "."));
    if (isNaN(parsedNumber)) return numberString;
    
    return parsedNumber.toLocaleString("de-DE", {
      minimumFractionDigits: parsedNumber % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div>
      <table
        className="table mt-2"
        style={{ fontFamily: poppins.style.fontFamily }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: "#f2efea", fontSize: "14px" }}>
              <div>
                <span className="d-flex justify-content-lg-start ps-3">
                  Fecha y hora
                </span>
              </div>
            </th>
            <th style={{ backgroundColor: "#f2efea", fontSize: "14px" }}>
              <div>
                <span className="ps-2 me-2 w-auto">Origen</span>
              </div>
            </th>
            <th style={{ backgroundColor: "#f2efea", fontSize: "14px" }}>
              <div>
                <span>Descripción</span>
              </div>
            </th>
            <th style={{ backgroundColor: "#f2efea", fontSize: "14px" }}>
              <div>
                <span className="d-flex justify-content-lg-end pe-3">
                  Movimiento
                </span>
              </div>
            </th>
            <th style={{ backgroundColor: "#f2efea", fontSize: "14px" }}>
              <div>
                <span className="d-flex justify-content-lg-end pe-4">
                  Acciones
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{ backgroundColor: "#fbf9f5" }}>
              <td style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}>
                <span className="px-3 py-4 d-flex justify-content-lg-start ps-3 text-black-50">
                  {formatDate(item.date)}
                </span>
              </td>
              <td style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}>
                <span className="px-3 py-4 text-black-50">{item.origin}</span>
              </td>
              <td style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}>
                <span className="px-3 py-4 text-black-50">
                  {item.description}
                </span>
              </td>
              <td style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}>
                <span
                  className={`px-3 py-4 d-flex justify-content-lg-end pe-3 ${
                    parseFloat(item.amount.replace(",", ".")) > 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  ${formatNumber(item.amount)}
                </span>
              </td>
              <td style={{ backgroundColor: "#fbf9f5", fontSize: "14px" }}>
                <span className="px-3 py-4 d-flex justify-content-lg-end pe-4">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={`fs-5 ${styles.iconHover} pe-4`}
                    data-bs-toggle="modal"
                    data-bs-target="#modalEdit"
                    onClick={() => handleEditClick(item)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={`fs-5 ${styles.iconHover}`}
                    onClick={() => deleteMovement(item.id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Edit data={selectedItem} onDataUpdated={onDataUpdated} />
    </div>
  );
});
