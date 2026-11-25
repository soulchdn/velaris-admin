// El "portero" de la app: se ejecuta antes de cada página.
// 1. Renueva la sesión de Supabase (guarda las cookies nuevas).
// 2. Si nadie inició sesión, manda a la persona a /login.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    );
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    // Pregunta a Supabase quién es la persona (y renueva la sesión si hace falta).
    const { data } = await supabase.auth.getClaims();
    const usuario = data?.claims;

    const enLogin = request.nextUrl.pathname.startsWith("/login");

    // Sin sesion y fuera de /login > mandarla a /login.
    if (!usuario && !enLogin) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Con sesión y en /login > mandarla al inicio.
    if (usuario && enLogin) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        const redireccion = NextResponse.redirect(url);
        // Pasar las cookies renovadas a la redirección, para no perderlas.
        response.cookies.getAll().forEach((cookie) => redireccion.cookies.set(cookie));
        return redireccion;
    }

    return response;
}
// En qué direcciones trabaja el portero: en todas, menos archivos
// internos de Next.js e imágenes (no hace falta revisar un logo).
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
