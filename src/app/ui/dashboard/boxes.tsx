// Boxes.tsx

import { useEffect, useState } from 'react';
import { Poppins } from "next/font/google";
import styles from '../boxes.module.css';

export const poppins = Poppins({ weight: "500", subsets: ["latin"] });



interface BoxesProps {
  onDataUpdated: () => void;  // Acepta la función para actualizar datos
}

export default function Boxes({ onDataUpdated }: BoxesProps) {
  const [data, setData] = useState<string>('0');

  // Llamado a la API y almacenamiento de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/movement/balance");
        const result = await response.json();
        //console.log("Datos obtenidos:", result.data.balance);
        setData(result.data.balance);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [onDataUpdated]); // Cada vez que onDataUpdated cambie, se recarga la información

  return (
    <div className="container d-flex flex-row justify-content-between align-items-center mt-4">
      {/* Tarjeta 1 */}
      <div className={`card ${styles.card} ${styles['card-color-costum']} text-center text-black rounded-4`}
        style={{
          width: "300px", // Ancho de la tarjeta
          height: "150px", // Alto de la tarjeta
        }}>
        <div className="card-body d-flex flex-column h-100 justify-content-around">
          <p className="card-text d-flex justify-content-start m-0 text-black-50 fs-2 ps-3" style={{ fontFamily: poppins.style.fontFamily }}>
            Total
          </p>
          <h1 className="card-title d-flex justify-content-start m-0 align-self-center fs-1" style={{ fontFamily: poppins.style.fontFamily }}>
            {`$${data}`}
          </h1>
        </div>
      </div>
    </div>
  );
}
