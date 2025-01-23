import "bootstrap/dist/css/bootstrap.min.css";
import Confirm from "./confirm";


export default function Crear() {
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
          className="modal-content modal-costum p-2 pt-0"
          style={{ backgroundColor: "#FAF9F5" }}
        >
          {/* Header del Modal */}
          <div className="modal-header border-0">
            <h5 className="modal-title align-self-end pt-3 mb-0">
              Crear Cuenta
            </h5>
            <button
              type="button"
              className="btn-close btn-custom align-self-start"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Body del Modal */}
          <div className="modal-body d-flex flex-column">
            <input
              
              type="text"
              placeholder="Item"
              className="ps-4 py-2 rounded-3 border-1 border-dark"
              style={{ backgroundColor: "#fff" }}
            />
          </div>

          {/* Footer del Modal */}
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
