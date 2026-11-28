import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

//La pagina /clientes: la lista de las personas que dejan libros para vender

export default function PaginaClientes() {
    return (
        <main className="flex flex-1 flex-col items-center p-6">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
                <Link href="/" className="text-sm font-medium underline">
                    ← Volver al inicio
                </Link>
                <h1 className="mt-4 text-2xl font-semibold">Clientes</h1>

                {/* La lista se carga aparte: mientras llega, se muestra el mensaje de espera. */}
                <Suspense fallback={<p className="mt-6">Cargando clientes...</p>}>
                    <ListaClientes />
                </Suspense>
            </div>
        </main>
    );
}

// Pide los clientes a Supabase y los muestra 
async function ListaClientes() {
    // Esperar una visita real: esta lista siempre se arma en el momento.
    await connection();
    const supabase = await createClient();
    const { data: clientes, error } = await supabase
        .from("clientes")
        .select("id, nombre, telefono, comision")
        .order("nombre");

    if (error) {
        return <p className="mt-6">No se pudieron cargar los clientes.</p>;
    }

    if (clientes.length === 0) {
        return <p className="mt-6">Todavía no hay clientes</p>
    }

    return (
        <ul className="mt-6 flex flex-col gap-3">
            {clientes.map((cliente) => (
                <li key={cliente.id} className="rounded-2xl border-2 border-rosa px-4 py-3">
                    <p className="font-semibold">{cliente.nombre}</p>
                    <p className="text-sm">
                        {cliente.telefono ?? "Sin teléfono"} · Comisión {cliente.comision}%
                    </p>
                </li>
            ))}
        </ul>
    );
}