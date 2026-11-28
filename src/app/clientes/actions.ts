"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Lee un campo del formulario y lo limpia:
// quita los espacios de los bordes, y si quedó vacío devuelve null.

function texto(formData: FormData, campo: string) {
    const valor = String(formData.get(campo) ?? "").trim();
    return valor === "" ? null : valor;
}

// Crear un cliente con lo que se escribió en el formulario.
export async function crearCliente(
    estadoAnterior: string | null,
    formData: FormData,
) {
    const nombre = texto(formData, "nombre");
    if (!nombre) {
        return "El nombre es obligatorio.";
    }

    // La comisión: si quedó vacía, 25. Tiene que ser un número entero entre 0 y 100.
    const comisionTexto = texto(formData, "comision");
    const comision = comisionTexto === null ? 25 : Number(comisionTexto);
    if (!Number.isInteger(comision) || comision < 0 || comision > 100) {
        return "La comisión tiene que ser un número entero entre 0 y 100.";
    }

    // Guardar en Supabase.
    const supabase = await createClient();
    const { error } = await supabase.from("clientes").insert({
        nombre,
        telefono: texto(formData, "telefono"),
        cuenta_tipo: texto(formData, "cuenta_tipo"),
        cuenta_numero: texto(formData, "cuenta_numero"),
        banco: texto(formData, "banco"),
        titular: texto(formData, "titular"),
        comision,
        notas: texto(formData, "notas"),
    });

    if (error) {
        return "No se pudo guardar el cliente. Prueba de nuevo.";
    }

    // Todo bien: volver a la lista, que ya muestra al cliente nuevo.
    redirect("/clientes");
}