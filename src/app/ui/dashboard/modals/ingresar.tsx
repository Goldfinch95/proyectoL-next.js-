import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Confirm from "./confirm";
/* eslint-disable @typescript-eslint/no-unused-vars */

export default function Ingresar() {
  const [selectedValue, setSelectedValue] = useState("");
  const [gasto, setGasto] = useState("");
  const [itemList] = useState(["Cuenta 1", "Cuenta 2", "Cuenta 3"]);

  const onSelectItem = (item : any) => {
    setSelectedValue(item);
  };

  return (
    <div
      className="modal fade"
      id="modalIngresar"
      tabIndex= {-1}
      aria-labelledby="modalIngresar"
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
                {selectedValue || "Cuenta"}
              </button>
              <ul className="dropdown-menu w-100">
                {itemList.map((item, index) => (
                  <li key={index}>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => onSelectItem(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="number"
              placeholder="Gasto"
              className="ps-3 rounded-3 border-1 py-2"
              style={{ backgroundColor: "#fff" }}
              value={gasto}
              onChange={(e) => setGasto(e.target.value)}
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
