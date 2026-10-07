import { useEffect } from "react";
import Icono, { ICONOS } from "./Icono";
import { estiloCampo, estiloBotonSec } from "../utils/estilos";
import type { FiltroEstado } from "../types";

type Props = {
    busqueda: string;
    onBusqueda: (valor: string) => void;
    mostrarCalificaciones: boolean;
    onToggleCalificaciones: () => void;
    filtroEstado: FiltroEstado;
    onFiltroEstado: (valor: FiltroEstado) => void;
};

export default function BarraHerramientas({
                                              busqueda,
                                              onBusqueda,
                                              mostrarCalificaciones,
                                              onToggleCalificaciones,
                                              filtroEstado,
                                              onFiltroEstado,
                                          }: Props) {

    useEffect(() => {
        if (busqueda.trim()) {
            console.log(`buscando: ${busqueda}`);
        }
    }, [busqueda]);

    useEffect(() => {
        console.log(mostrarCalificaciones ? "se muestran las calificaciones" : "se ocultan las calificaciones");
    }, [mostrarCalificaciones]);

    return (
        <div className="flex flex-wrap items-center gap-3 p-5">
            <div className="relative min-w-60 flex-1">
                <Icono
                    d={ICONOS.buscar}
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                />
                <label htmlFor="buscar" className="sr-only">
                    Buscar
                </label>
                <input
                    id="buscar"
                    value={busqueda}
                    onChange={(e) => onBusqueda(e.target.value)}
                    placeholder="Buscar alumnos..."
                    className={`${estiloCampo} pl-11`}
                />
            </div>

            <button type="button" onClick={onToggleCalificaciones} className={estiloBotonSec}>
                <Icono d={mostrarCalificaciones ? ICONOS.ojoTachado : ICONOS.ojo} />
                {mostrarCalificaciones ? "Ocultar calificaciones" : "Mostrar calificaciones"}
            </button>

            <select
                aria-label="Filtrar por estado"
                value={filtroEstado}
                onChange={(e) => onFiltroEstado(e.target.value as FiltroEstado)}
                className={`${estiloBotonSec} appearance-none pr-8`}
            >
                <option value="todos">Todos</option>
                <option value="activo">Activos</option>
                <option value="inactivo">Inactivos</option>
            </select>

        </div>
    );
}