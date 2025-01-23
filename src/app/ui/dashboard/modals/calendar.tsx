import styles from "./calendar.module.css";
import Confirm from "./confirm";

export default function Calendar() {
  return (
    <div>
      <div
        className="modal fade"
        id="modalCalendario"
        tabIndex={-1}
        aria-labelledby="calendarModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className={`modal-header ${styles["font-title"]}`}>
              
              <h5 className="modal-title">
              </h5>
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-toggle="modal"
              data-bs-target="#modalConfirm">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Confirm />
    </div>
  );
}


