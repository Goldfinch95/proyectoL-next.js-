"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Confirm from "./confirm";

export default function Crear() {
  const [formData, setFormData] = useState({
    origin: "",
    description: "",
    amount: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetInputValue = () => {
    setFormData({
      origin: "",
      description: "",
      amount: "",
    });
  };

  useEffect(() => {
    const modalElement = document.getElementById("modalCrear");
    const handleModalClose = () => {
      resetInputValue();
    };

    if (modalElement) {
      modalElement.addEventListener("hide.bs.modal", handleModalClose);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hide.bs.modal", handleModalClose);
      }
    };
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Mes en formato "MM"
    const day = String(now.getDate()).padStart(2, "0"); // Día en formato "DD"
    return `${year}-${month}-${day}T00:00:00.000Z`;
  };

  const handleSubmit = async () => {
    const currentDate = getCurrentDate();
    const payload = {
      date: currentDate, // Fecha y hora en formato "YYYY-MM-DDT00:00:00.000Z"
      origin: formData.origin,
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
        // Si la respuesta es exitosa, puedes manejar lo que se debe hacer (por ejemplo, mostrar un mensaje de éxito)
        console.log("Movimiento creado exitosamente");
        resetInputValue(); // Opcional: limpiar los inputs después de enviar el formulario
      } else {
        // Si hay algún error en la respuesta, maneja el error
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
          className="modal-content p-5 pt-3 rounded rounded-5 border-0"
          style={{ backgroundColor: "#FAF9F5" }}
        >
          <div className="modal-header border-0">
            <h3 className="modal-title">
              Crear Movimiento
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetInputValue}
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
          <div
              className="d-flex flex-column py-2 rounded-3 my-3 border-0"
              style={{ backgroundColor: "#f2efea" }}
            >
              <span className="d-flex justify-content-start w-100 ps-3 ">
              Fecha
              </span>
              <input
                type="text"
                name="date"
                value={formData.origin}
                onChange={handleInputChange}
                placeholder="Pone tu Fecha"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 py-2"
                style={{ outline: "none" }}
              />
            </div>
            <div
              className="d-flex flex-column py-2 rounded-3 my-3 border-0"
              style={{ backgroundColor: "#f2efea" }}
            >
              <span className="d-flex justify-content-start w-100 ps-3 ">
                Origen
              </span>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                placeholder="Pone tu Origen"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 py-2"
                style={{ outline: "none" }}
              />
            </div>
            <div
              className="d-flex flex-column py-2 rounded-3 my-3 border-0"
              style={{ backgroundColor: "#f2efea" }}
            >
              <span className="d-flex justify-content-start w-100 ps-3 ">
                description
              </span>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Pone tu Descripción"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 py-2"
                style={{ outline: "none" }}
              />
            </div>
            <div
              className="d-flex flex-column py-2 rounded-3 my-3 border-0"
              style={{ backgroundColor: "#f2efea" }}
            >
              <span className="d-flex justify-content-start w-100 ps-3 ">
              amount
              </span>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Pone tu Movimiento"
                className="w-100 bg-transparent border-0 ps-3 f-3 text-black-50 py-2"
                style={{ outline: "none" }}
              />
            </div>
          </div>
          <div className="modal-footer d-flex flex-nowrap justify-content-between w-100 border-0">
            <button
              type="button"
              className="btn btn-primary border-dark rounded-4 px-4 py-3 w-100 fs-4"
              style={{ backgroundColor: "#292929" }}
              data-bs-toggle="modal"
              data-bs-target="#modalConfirm"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <Confirm />
    </div>
  );
}
