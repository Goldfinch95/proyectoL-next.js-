"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Poppins } from "next/font/google";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export default function Crear({ onDataUpdated }: { onDataUpdated: () => void }) {
  const [formData, setFormData] = useState({
    date: "",
    origin: "",
    description: "",
    amount: "",
  });

  // Controlador para los cambios en el formulario
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Resetear los valores del formulario
  const resetInputValue = () => {
    setFormData({
      date: "",
      origin: "",
      description: "",
      amount: "",
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString(), // Formato "YYYY-MM-DDT00:00:00.000Z"
      }));
    }
  };

  // Enviar el formulario
  const handleSubmit = async () => {
    const payload = {
      date: formData.date,
      origin: formData.origin.toUpperCase(),
      description: formData.description,
      amount: formData.amount,
    };

    try {
      const response = await fetch("http://localhost:3000/movement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        /*console.log("Movimiento creado exitosamente");*/
        resetInputValue();
        onDataUpdated(); // Llamamos a la función para actualizar la tabla
      } else {
        console.error("Error al crear el movimiento");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  //formulario
  return (
    <div
      className="modal fade"
      id="modalCrear"
      tabIndex={-1}
      aria-labelledby="modalCrearLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div
          className="modal-content p-4 rounded rounded-5 border-0"
          style={{ backgroundColor: "#FAF9F5",  fontFamily: poppins.style.fontFamily }}
          
        >
          <div className="modal-header border-0">
            <h3 className="modal-title">Crear Movimiento</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetInputValue}
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <div>
              <span className="d-flex justify-content-start w-100 ps-2">
                Fecha
              </span>
            </div>
            <div
              className="d-flex flex-column py-2 rounded-3 border-0 mt-1"
              style={{ backgroundColor: "#f2efea" }}
            >
              <DatePicker
                selected={formData.date ? new Date(formData.date) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy" // Visualización personalizada
                placeholderText="D/M/A"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 my-1"
                
              />
            </div>
            <div>
            <span className="d-flex justify-content-start w-100 ps-2 pt-2 mt-2">
            Origen
              </span>
            </div>
            <div
              className="d-flex flex-column py-2 rounded-3 border-0 mt-1"
              style={{ backgroundColor: "#f2efea" }}
            >
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                placeholder="Ej: Saldo"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 my-1"
                style={{ outline: "none" }}
              />
            </div>
            <div>
            <span className="d-flex justify-content-start w-100 ps-2 pt-2 mt-2">
            Descripción
              </span>
            </div>
            <div
              className="d-flex flex-column py-2 rounded-3 border-0 mt-1"
              style={{ backgroundColor: "#f2efea" }}
            >
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ej: Ingresos Por Ventas"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 my-1"
                style={{ outline: "none" }}
              />
            </div>
            <div>
            <span className="d-flex justify-content-start w-100 ps-2 pt-2 mt-2">
            Movimiento
              </span>
            </div>
            <div
              className="d-flex flex-column py-2 rounded-3 border-0 mt-1"
              style={{ backgroundColor: "#f2efea" }}
            >
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="$0.00"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 my-1"
                style={{ outline: "none" }}
              />
            </div>
          </div>
          <div className="modal-footer d-flex flex-nowrap justify-content-between w-100 border-0">
            <button
              type="button"
              className="btn btn-primary border-dark rounded-4 px-4 py-3 w-100 fs-4"
              style={{ backgroundColor: "#292929" }}
              data-bs-dismiss="modal"
              aria-label="Confirm"
              onClick={handleSubmit}
            >
              <span className="fs-3">Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
