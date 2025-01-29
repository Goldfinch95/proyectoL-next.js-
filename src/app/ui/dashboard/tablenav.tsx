"use client";

import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../tablenav.module.css";
import debounce from "lodash.debounce";

interface TableNavProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function TableNav({ searchTerm, setSearchTerm }: TableNavProps) {
  const handleSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 1000),
    [setSearchTerm]
  );
  /*const handleSearch = useCallback(
    debounce((term: string) => {
      // Filtra los movimientos cuyo origin coincida (case-insensitive)
      const filteredData = data.filter(movement =>
        movement.origin.toLowerCase().includes(term.toLowerCase())
      );
      
      console.log("Datos filtrados por origin:", filteredData);
    }, 1000),
    [data] // La dependencia asegura que se use la data actualizada
  );*/

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 mb-3 border-bottom">
      <div className="d-flex align-items-center gap-3">
        <div className="input-group w-100">
          <button
            className={`btn btn-outline-secondary ${styles["btn-custom"]}`}
            type="button"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="text"
            className={`form-control ps-0 ${styles["form-control"]}`}
            placeholder="Buscar cuenta..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
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
          data-bs-target="#modalIngresar"
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
          Crear Movimiento
        </button>
      </div>
    </div>
  );
}
