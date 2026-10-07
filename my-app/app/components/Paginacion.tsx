import Icono, { ICONOS } from "./Icono";

type Props = {
    inicio: number;
    mostrados: number;
    total: number;
    paginaActual: number;
    totalPaginas: number;
    onCambiarPagina: (pagina: number) => void;
};

export default function Paginacion({
                                       inicio,
                                       mostrados,
                                       total,
                                       paginaActual,
                                       totalPaginas,
                                       onCambiarPagina,
                                   }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-5 text-sm text-slate-500">
            <p>
                {total === 0 ? (
                    "Mostrando 0 de 0 resultados"
                ) : (
                    <>
                        Mostrando{" "}
                        <b className="text-slate-800">
                            {inicio + 1}–{inicio + mostrados}
                        </b>{" "}
                        de <b className="text-slate-800">{total}</b> resultados
                    </>
                )}
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => onCambiarPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    aria-label="Página anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 disabled:opacity-40"
                >
                    <Icono d={ICONOS.izq} className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => onCambiarPagina(n)}
                        className={`h-10 w-10 rounded-xl font-semibold ${
                            n === paginaActual ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        {n}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={() => onCambiarPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    aria-label="Página siguiente"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 disabled:opacity-40"
                >
                    <Icono d={ICONOS.der} className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}