import Image from "next/image";
import Nav from "@/app/ui/dashboard/nav";

export default function Page() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Nav />
      <Image
        src="/website_under_construction.webp"
        alt="Página en construcción"
        layout="fill"
        objectFit="contain"
        style={{ zIndex: -1 }} // Asegura que la imagen quede detrás del contenido
      />
    </div>
  );
}
