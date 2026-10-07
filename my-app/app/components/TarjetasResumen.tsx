import type { Alumno } from "../types";

type Props = { alumnos: Alumno[] };

export default function TarjetasResumen({ alumnos }: Props) {
    const activos = alumnos.filter((a) => a.activo).length;
    const promedioGeneral = alumnos.length
        ? (alumnos.reduce((suma, a) => suma + a.promedio, 0) / alumnos.length).toFixed(1)
        : "0";

    const tarjetas: [string, string | number][] = [
        ["Total de alumnos", alumnos.length],
        ["Alumnos activos", activos],
        ["Promedio general", promedioGeneral],
    ];

    return (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {tarjetas.map(([titulo, valor]) => (
                <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">{titulo}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{valor}</p>
                </div>
            ))}
        </div>
    );
}