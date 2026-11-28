-- Tabla de clientes: las personas que dejan libros para vender.
create table public.clientes (
    id bigint generated always as identity primary key,
    nombre text not null,
    telefono text,
    cuenta_tipo text check (cuenta_tipo in ('ci', 'celular', 'cuenta')),
    cuenta_numero text,
    banco text,
    titular text,
    comision smallint not null default 25 check (
        comision between 0 and 100
    ),
    notas text,
    creado_en timestamptz not null default now()
);
-- Bloquear la tabla: nadie ve ninguna fila sin una regla que lo permita.
alter table public.clientes enable row level security;
-- Dejar que las personas con sesión iniciada usen la tabla.
grant select,
    insert,
    update on public.clientes to authenticated;
-- Reglas: cualquier persona del equipo con sesión iniciada puede ver, agregar y editar.
create policy "El equipo puede ver clientes" on public.clientes for
select to authenticated using (true);

create policy "El equipo puede agregar clientes" on public.clientes for
insert to authenticated with check (true);

create policy "El equipo puede editar clientes" on public.clientes for
update to authenticated using (true) with check (true);