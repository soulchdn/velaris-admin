// Página de prueba: comprueba si la app puede llegar a Supabase.
// La borraremos cuando la conexión esté confirmada.

export default async function PruebaPage() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL; 
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    let mensaje = "";
    let ok = false; 

    if(!url || !key) {
        mensaje = "Faltan las variables en .env.local";       
    } else {
        try {
            const respuesta = await fetch(`${url}/auth/v1/health`, {
                headers: { apikey: key },
                cache: "no-store",
            });
            ok = respuesta.ok;
            mensaje = ok 
            ? "Conexión con Supabase: funciona"
            : `Supabase respondio con un error (codigo ${respuesta.status})`
        } catch {
            mensaje = "No se pudo llegar a Supabasse";
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-8">
            <p className="text-xl text-verde">
                {ok ? "✅" : "❌"} {mensaje}
            </p>
        </main>
    );
}