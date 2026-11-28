"use client";

// El formulario para agregar un cliente. Corre en el navegador,
// porque muestra los errores y cambia el botón mientras se guarda.

import { useActionState } from "react";
import { crearCliente } from "../actions";

const estiloCaja = "rounded-2xl border-2 border-rosa px-4 py-3 outline-none focus:border-rosa-viejo";

export function FormularioCliente() {
    const [mensajeError, enviar, enviando] = useActionState(crearCliente, null);

    return (
        <form action={enviar} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1">
                <span className="font-medium">Nombre</span>
                <input type="text" name="nombre" required className={estiloCaja} />
            </label>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Teléfono</span>
                <input type="tel" name="telefono" className={estiloCaja} />
            </label>

            {/* Datos para pagarle al cliente su parte de cada venta */}
            <fieldset className="flex flex-col gap-4 rounded-2xl border-2 border-rosa p-4">
                <legend className="px-2 font-medium">Datos para la transferencia</legend>

                <label className="flex flex-col gap-1">
                    <span className="font-medium">Tipo</span>
                    <select name="cuenta_tipo" defaultValue="" className={estiloCaja}>
                        <option value="">Sin datos</option>
                        <option value="ci">Cédula (CI)</option>
                        <option value="celular">Número de celular</option>
                        <option value="cuenta">Número de cuenta</option>
                    </select>
                </label>

                <label className="flex flex-col gap-1">
                    <span className="font-medium">Número</span>
                    <input type="text" name="cuenta_numero" className={estiloCaja} />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="font-medium">Banco</span>
                    <input type="text" name="banco" className={estiloCaja} />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="font-medium">Titular</span>
                    <input type="text" name="titular" className={estiloCaja} />
                </label>
            </fieldset>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Comisión (%)</span>
                <input
                    type="number"
                    name="comision"
                    defaultValue={25}
                    min={0}
                    max={100}
                    step={1}
                    className={estiloCaja}
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="font-medium">Notas</span>
                <textarea name="notas" rows={3} className={estiloCaja} />
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
                {enviando ? "Guardando..." : "Guardar cliente"}
            </button>
        </form>
    );
}