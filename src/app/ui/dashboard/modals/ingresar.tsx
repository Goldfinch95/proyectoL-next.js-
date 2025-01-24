"use client"

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import Confirm from "./confirm";

export default function Ingresar() {
  const [selectedItem, setSelectedItem] = useState<string>('');;
  const [inputValue, setInputValue] = useState('');
  const items = ["Chino", "Libreria", "Agua"];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); 
    console.log(event.target.value);
    console.log(inputValue) 
  };

  const resetInputValue = () => {
    setTimeout(() => {
      setInputValue(''); 
    }, 1000); 
  };

  useEffect(() => {
      const modalElement = document.getElementById('modalIngresar');
      const handleModalClose = () => {
        resetInputValue(); 
      };
  
      
      if (modalElement) {
        modalElement.addEventListener('hide.bs.modal', handleModalClose);
      }
  
      
      return () => {
        if (modalElement) {
          modalElement.removeEventListener('hide.bs.modal', handleModalClose);
        }
      };
    }, []);

  const handleSelect = (item: string) => {
    setSelectedItem(item); // Actualiza el estado con el ítem seleccionado
  };

  
  return (
    <div
      className="modal fade"
      id="modalIngresar"
      tabIndex={-1}
      aria-labelledby="modalIngresarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content modal-costum p-2 pt-0"
          style={{ backgroundColor: "#FAF9F5" }}
        >
          {/* Modal Header */}
          <div className="modal-header border-0">
            <h5 className="modal-title align-self-end pt-3 mb-0">
              Ingresar movimiento
            </h5>
            <button
              type="button"
              className="btn-close btn-custom align-self-start"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body d-flex flex-column">
            <div className="dropdown">
            <button
                className="btn btn-light border-dark dropdown-toggle w-100 mb-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedItem || "Selecciona una opción"} {/* Muestra el ítem seleccionado o el texto predeterminado */}
              </button>
              <ul className="dropdown-menu w-100">
                {items.map((item, index) => (
                  <li key={index}>
                    <a
              className="dropdown-item"
              href="#"
              onClick={() => handleSelect(item)} // Al hacer clic, se selecciona el ítem
            >
              {item}
            </a>
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="number"
              placeholder="Gasto"
              className="ps-3 rounded-3 border-1 py-2"
              style={{ backgroundColor: "#fff" }}
              onChange={handleInputChange}
            />
          </div>

          {/* Modal Footer */}
          <div className="modal-footer d-flex flex-nowrap justify-content-between w-100 border-0">
            <button
              type="button"
              className="btn btn-light border-2 border-dark rounded-pill px-4 w-100"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary border-dark rounded-pill px-4 w-100"
              style={{ backgroundColor: "#292929" }}
              data-bs-toggle="modal"
              data-bs-target="#modalConfirm"
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <Confirm />
    </div>
  );
}
