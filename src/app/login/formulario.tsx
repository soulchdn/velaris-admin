"use client";

// El formulario para iniciar sesión. Corre en el navegador,
// porque tiene que reaccionar cuando la persona presiona el botón.

import { useActionState } from "react";
import { iniciarSesion } from "./actions";

export function Formulario() {
    const [mensajeError, enviar, enviando] = useActionState(iniciarSesion, null);

    return (
        <form action={enviar} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1">
                <span className="font-medium">Correo</span>
                <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="rounded-2xl border-2 border-rosa px-4 py-3 outline-none focus:border-rosa-viejo"
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Contraseña</span>
                <input
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    className="rounded-2xl border-2 border-rosa px-4 py-3 outline-none focus:border-rosa-viejo"
                />
            </label>

            {mensajeError && (
                <p role="alert" className="rounded-2xl border-2 border-rosa-viejo bg-rosa-suave px-4 py-3 text-sm">
                    {mensajeError}
                </p>
            )}

            <button
                type="submit"
                disabled={enviando}
                className="rounded-2xl bg-rosa px-4 py-3 font-semibold text-carbon disabled:opacity-60"
            >
                {enviando ? "Entrando…" : "Entrar"}
            </button>
        </form>
    );
}