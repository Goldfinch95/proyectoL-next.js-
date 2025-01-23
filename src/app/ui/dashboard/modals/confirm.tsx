export default function Confirm() {
    return(
        <div
        className="modal fade"
        id="modalConfirm"
        tabIndex={-1}
        aria-labelledby="modalConfirm"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div
            className="modal-content modal-costum p-2 pt-0"
            style={{ backgroundColor: "#FAF9F5" }}
          >
            {/* Modal Header */}
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="modalConfirmationLabel">
                {/* Puedes poner un título dinámico si lo necesitas */}
              </h1>
              <button
                type="button"
                className="btn-close btn-custom align-self-start"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
  
            {/* Modal Body */}
            <div className="modal-body d-flex justify-content-center">
              <span>¿Estás seguro?</span>
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
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}