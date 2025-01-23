"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Importamos usePathname
import SideNav from "../ui/dashboard/sidenav";
import Nav from "../ui/dashboard/nav";
import Boxes from "../ui/dashboard/boxes";
import TableNav from "../ui/dashboard/tablenav";
import Calendar from "../ui/dashboard/modals/calendar";
import Ingresar from "../ui/dashboard/modals/ingresar";
import Crear from "../ui/dashboard/modals/crear";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual

  useEffect(() => {
    // Si estamos en /dashboard, redirigimos a /dashboard/caja
    if (pathname === "/dashboard") {
      router.push("/dashboard/caja");
    }
  }, [pathname, router]); // Aseguramos que la redirección ocurra al cambiar el pathname

  return (
    <main className="container-fluid">
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-2 col-sm-3 col-xl-2" style={{ backgroundColor: '#fbf9f5' }}>
          <div className="sticky-top">
            <SideNav />
          </div>
        </div>
        <div className="col-10 col-sm-9 col-xl-10 m-0" style={{ backgroundColor: '#fbf9f5' }}>
          <div className="sticky-top" style={{ backgroundColor: '#fbf9f5' }}>
            <Nav />
            <Boxes />
            <TableNav />
          </div>
        </div>
      </div>
      <Calendar />
      <Ingresar />
      <Crear />
    </main>
  );
}




  {/*return (
      <div className="d-flex flex-column flex-md-row overflow-hidden-md">
    <div className=" flex-shrink-0 w-md-25">
      <SideNav />
    </div>
    <div className="flex-grow-1 overflow-auto-md">
      {children}
    </div>
  </div>
    );*/}