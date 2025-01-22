import styles from '../boxes.module.css';

export default function Boxes() {
  return (
    <div className="container d-flex flex-row justify-content-between align-items-center mt-4">
      {/*Tarjeta 1*/}
      <div className={`card ${styles.card} ${styles['card-color-costum']} text-center text-black rounded-4`}>
        <div className="card-body d-flex flex-column">
        <p className="card-text d-flex justify-content-start m-0 text-black-50">
            total
          </p>
          <h1 className="card-title d-flex justify-content-start m-0">
            1.000K
          </h1>
        </div>
      </div>
    </div>
  );
}
