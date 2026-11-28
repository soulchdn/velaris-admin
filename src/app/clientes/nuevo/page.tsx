import Link from "next/link";
import { FormularioCliente } from "./formulario";

export default function PaginaNuevoCliente() {
    return (
        <main className="flex flex-1 flex-col items-center p-6">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
                <Link href="/clientes" className="text-sm font-medium underline">
                    ← Volver a clientes
                </Link>
                <h1 className="mt-4 text-2xl font-semibold">Nuevo cliente</h1>
                <FormularioCliente />
            </div>
        </main>
    );
}