import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
export const poppins = Poppins({ weight: "600", subsets: ["latin"] });

interface DataItem {
  id: string;
  date: string;
  origin: string;
  description: string;
  amount: string;
  createdAt: string;
}

interface EditProps {
  data: DataItem | null;
  onDataUpdated: () => void;
}

export default function Edit({ data, onDataUpdated }: EditProps) {
  const [formData, setFormData] = useState({
    date: "",
    origin: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        date: data.date,
        origin: data.origin,
        description: data.description,
        amount: data.amount,
      });
    }
  }, [data]);

  // Formatear fecha para display
  // Corrección para el formato de fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy"); // ✅ Correcto en v4.1.0
    } catch {
      return "Fecha inválida";
    }
  };

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
    if (data) {
      try {
        
        const payload = {
            description: formData.description,
            amount: formData.amount, // Formato correcto
            date: formData.date, // Mantiene el timestamp completo
            origin: formData.origin.toUpperCase(), // Envía en mayúsculas si el backend lo espera
            createdAt: data.createdAt, // Usa el valor original
            updatedAt: new Date().toISOString(), // Fecha actual
          };

        console.log(payload.amount);


        const response = await fetch(
          `http://localhost:3000/movement/${data.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          onDataUpdated();
        } else {
          const errorData = await response.json();
          console.error("Error en la actualización:", errorData);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      
      return;
    }
  };

  return (
    <div
      className="modal fade"
      id="modalEdit"
      tabIndex={-1}
      aria-labelledby="modalEdit"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div
          className="modal-content p-4 rounded rounded-5 border-0"
          style={{
            backgroundColor: "#FAF9F5",
            fontFamily: poppins.style.fontFamily,
          }}
        >
          <div className="modal-header border-0">
            <h3 className="modal-title">Editar Movimiento</h3>
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
                dateFormat="dd MMM yyyy"
                placeholderText={
                  data?.date ? formatDate(data.date) : "Selecciona fecha"
                }
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
                placeholder={data?.origin}
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
                placeholder={data?.description}
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
                placeholder={data?.amount}
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
