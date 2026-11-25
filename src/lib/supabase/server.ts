// Crea una conexión con Supabase para usar en el servidor
// (páginas, componentes de servidor y acciones).
// Lee y guarda la sesión en las cookies del navegador.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        );
                    } catch {
                         // Las páginas no pueden guardar cookies; de eso se encarga el proxy.
                    }
                },
            },
        },
    );
}