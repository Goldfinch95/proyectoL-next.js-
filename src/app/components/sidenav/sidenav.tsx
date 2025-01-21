import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar, faLandmark } from "@fortawesome/free-solid-svg-icons";
import { inter } from "@/app/fonts";

export default function Navbar() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg border-bottom border-black mb-3">
        <div className="container-fluid d-flex justify-content-center">
          <Link className="navbar-brand m-0" href="#">
            <Image
              height={150}
              width={150}
              src="/logo_preview.webp" // Ruta del archivo en la carpeta public
              alt="logo"
              className="img-fluid"
            />
          </Link>
        </div>
      </nav>
      <ul className="nav flex-column">
  <li className="nav-item text-black rounded-3 pb-3 w-100">
    <Link
      className="nav-link active d-flex align-items-center text-black rounded-3"
      aria-current="page"
      href="/caja"
    >
      <div className="me-2 d-flex align-items-center">
        <FontAwesomeIcon icon={faMoneyCheckDollar} />
      </div>
      <span className={`${inter.className}ms-2`}>Caja</span>
    </Link>
  </li>
  <li className="nav-item text-black rounded-3 pb-3 w-100">
    <Link
      className="nav-link active d-flex align-items-center text-black rounded-3"
      aria-current="page"
      href="/fondo_fijo"
    >
      <div className="me-2 d-flex align-items-center">
        <FontAwesomeIcon icon={faLandmark}  />
      </div>
      <span className={`${inter.className}ms-2`}>Fondo Fijo</span>
    </Link>
  </li>
</ul>
    </div>
  );
}
