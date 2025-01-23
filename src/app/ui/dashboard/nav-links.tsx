"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar, faLandmark } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const links = [
  { name: "Caja", href: "/dashboard/caja", icon: faMoneyCheckDollar },
  { name: "Fondo Fijo", href: "/dashboard/fondo_fijo", icon: faLandmark },
];

export default function NavLinks() {
  const pathname = usePathname();

  // Si pathname es undefined, no renderizamos nada o aplicamos una verificación.
  if (!pathname) {
    return null; // O puedes mostrar un loader o algo similar mientras se obtiene el pathname.
  }

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "nav-link d-flex align-items-center px-3 py-2 w-100 rounded-3",
              {
                "active text-black": pathname === link.href,
                "text-black": pathname !== link.href,
              }
            )}
          >
            <FontAwesomeIcon className="fs-5" icon={link.icon} />
            <span className="mb-0">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
