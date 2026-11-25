import Image from "next/image";
import { Formulario } from "./formulario";

// La página /login: el logo, un título y el formulario.

export default function PaginaLogin() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-lg">
                {/*Franja con logo*/}
                <div className="px-8 pt-10">
                    <Image
                        src="/velaris-logo.svg"
                        alt="Velaris, tienda literaria"
                        width={816}
                        height={288}
                        preload
                        className="h-auto w-full"
                    />
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-8">
                    <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
                    <p className="mt-1">Entrá con tu correo y contraseña.</p>
                    <Formulario />
                </div>
            </div>
        </main>
    );
}