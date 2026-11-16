import Image from "next/image";

// Secciones a ser construidas
const secciones = ["Clientes", "Libros", "Ventas", "Pagos", "Reportes"];

export default function Inicio() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-6">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-lg">
        {/* Franja con el logo */}
        <div className="px-8 pt-10">
          <Image
            src="/velaris-logo.svg"
            alt="Velaris, tienda literaria"
            width={816}
            height={288}
            priority
            className="h-auto w-full"
          />
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold">Hola, equipo de Velaris</h1>
          <p className="mt-2">
            Este es el comienzo del sistema de gestión de la tienda, pronto vas
            a poder usar estas secciones:
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {secciones.map((seccion) => (
              <li
                key={seccion}
                className="rounded-2xl border-2 border-rosa px-4 py-3 text-center font-medium"
              >
                {seccion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}