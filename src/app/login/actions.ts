"use server";

// Acciones del login. Se ejecutan en el servidor, nunca en el navegador,
// así la contraseña no queda expuesta en el código de la página.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Iniciar sesión: recibe lo que se escribió en el formulario.

export async function iniciarSesion(
    estadoAnterior: string | null,
    formData: FormData,
) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return "Correo o contraseña incorrectos.";
    }

    redirect("/");
}

// Cerrar sesión: anula la sesión y vuelve a /login.
export async function cerrarSesion() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}