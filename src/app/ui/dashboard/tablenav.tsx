"use client";

import { useCallback, useEffect, useState } from "react";
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
  onSearch: (term: string) => void; // Nueva prop para manejar la búsqueda
}

export default function TableNav({ searchTerm, setSearchTerm, onSearch }: TableNavProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Debounce the search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term); // Llamar a la función de búsqueda cuando el usuario deja de escribir
    }, 1000),
    [onSearch]
  );

  // Actualizar el valor del input y disparar la búsqueda debounced
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setInputValue(term); // Actualizar el estado local del input
    debouncedSearch(term); // Disparar la búsqueda debounced
  };

  // Sincronizar el estado local con el prop searchTerm
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 mb-3 border-bottom">
      <div className="d-flex align-items-center gap-3 mb-2">
        <div className="input-group w-100 ">
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
            value={inputValue}
            onChange={handleInputChange}
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
          className="btn btn-dark border-2 border-dark rounded-4 mb-2 px-3"
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