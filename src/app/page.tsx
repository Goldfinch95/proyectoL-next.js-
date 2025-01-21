import SideNav from "./components/sidenav/sidenav";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        {/* Navbar lateral */}
        <div
          className="col-2 col-sm-3 col-xl-2"
          style={{ backgroundColor: "#fbf9f5" }}
        >
          <div className="sticky-top">
            <SideNav />
          </div>
        </div>

        {/* Contenido principal */}
        <div
          className="col-10 col-sm-9 col-xl-10 m-0"
          style={{ backgroundColor: "#fbf9f5" }}
        >
          <div className="sticky-top" style={{ backgroundColor: "#fbf9f5" }}>
            {/* Navegación */}
            <span>nav</span>
            {/* <app-nav /> */}

            {/* Boxes */}
            <span>boxes</span>
            {/* <app-container-boxes /> */}

            {/* Tablas */}
            <span>tablas</span>
            {/* <app-table-nav /> */}
          </div>

          {/* Página principal */}
          <div className="px-3">
            <span>pagina</span>
            {/* <router-outlet /> */}
          </div>
        </div>
      </div>

      {/* Modales */}
      {/* 
      <app-modal-ingresar />
      <app-modal-crear />
      <app-modal-calendario />
      <app-modal-info /> 
      */}
    </div>
  );
}

