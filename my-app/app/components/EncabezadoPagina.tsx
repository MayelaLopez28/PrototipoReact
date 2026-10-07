import Icono, { ICONOS } from "./Icono";
import { estiloBotonPrimario } from "../utils/estilos";

type Props = { onAgregar: () => void };

export default function EncabezadoPagina({ onAgregar }: Props) {
    return (
        <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Alumnos</h1>
            </div>
            <button type="button" onClick={onAgregar} className={estiloBotonPrimario}>
                <Icono d={ICONOS.mas} /> Agregar alumno
            </button>
        </header>
    );
}