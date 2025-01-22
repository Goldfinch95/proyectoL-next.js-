import Link from "next/link";
import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav(){
    return (
        <div className="container">
          <nav className="navbar navbar-expand-lg border-bottom border-black mb-3">
            <div className="container-fluid d-flex justify-content-center">
              <Link className="navbar-brand m-0" href="/">
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
      <li className="nav-item flex-column  text-black rounded-3 pb-3 d-flex align-items-center   gap-2 w-100 justify-content-between">
        <NavLinks />
      </li>
    </ul>
        </div>
      );
}