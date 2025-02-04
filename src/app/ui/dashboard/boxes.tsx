import { Poppins } from "next/font/google";
import styles from '../boxes.module.css';

export const poppins = Poppins({ weight: "500", subsets: ["latin"] });

interface BoxesProps {
  balance: string;
  onDataUpdated: () => void;
}

export default function Boxes({ balance, onDataUpdated }: BoxesProps) {
  return (
    <div className="container d-flex flex-row justify-content-between align-items-center mt-4">
      <div className={`card ${styles.card} ${styles['card-color-costum']} text-center text-black rounded-4`}
        style={{ width: "300px", height: "150px" }}>
        <div className="card-body d-flex flex-column h-100 justify-content-around">
          <p className="card-text d-flex justify-content-start m-0 text-black-50 fs-2 ps-3" 
             style={{ fontFamily: poppins.style.fontFamily }}>
            Total
          </p>
          <h1 className="card-title d-flex justify-content-start m-0 align-self-center fs-1" 
              style={{ fontFamily: poppins.style.fontFamily }}>
            {`$${balance}`}
          </h1>
        </div>
      </div>
    </div>
  );
}