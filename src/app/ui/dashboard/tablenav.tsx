"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import styles from '../tablenav.module.css'

export default function TableNav() {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = () => {
    // Lógica para buscar, por ejemplo, filtrar resultados
    console.log("Buscando: ", searchTerm);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 mb-3 border-bottom">
      <div className="d-flex align-items-center gap-3">
        <div className="input-group w-100">
          <button
          className={`btn btn-outline-secondary ${styles['btn-custom']}`}
            type="button"
            onClick={onSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="text"
            className={`form-control ps-0 ${styles['form-control']}`}
            placeholder="Buscar cuenta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onInput={onSearch}
          />
        </div>
        <button
          type="button"
          className="btn btn-light border-2 border-dark rounded-4"
          style={{ backgroundColor: "#f2efea" }}
          data-bs-toggle="modal"
          data-bs-target="#modalCalendario"
        >
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>

      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-light border-2 border-dark rounded-pill mb-3 px-4"
          style={{ backgroundColor: "#f2efea" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Añadir
        </button>
        <button
          type="button"
          className="btn btn-dark border-2 border-dark rounded-pill mb-3 px-5"
          style={{ backgroundColor: "#292929" }}
          data-bs-toggle="modal"
          data-bs-target="#modalCrear"
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  );
}
