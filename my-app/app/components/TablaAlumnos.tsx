import FilaAlumno from "./FilaAlumno";
import { idVisible } from "../utils/alumnos";
import type { Alumno } from "../types";

type Props = {
    alumnos: Alumno[];
    mostrarCalificaciones: boolean;
    menuAbierto: number | null;
    onToggleMenu: (id: number) => void;
    onCambiarEstado: (id: number) => void;
    onCambiarCalificacion: (id: number, calificacion: number) => void;
    onEliminar: (id: number) => void;
};

export default function TablaAlumnos({
                                         alumnos,
                                         mostrarCalificaciones,
                                         menuAbierto,
                                         onToggleMenu,
                                         onCambiarEstado,
                                         onCambiarCalificacion,
                                         onEliminar,
                                     }: Props) {
    return (
        <div className="overflow-x-auto border-t border-slate-100">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-400">
                <tr>
                    <th className="px-4 py-4">Alumno</th>
                    <th className="px-3 py-4">ID</th>
                    <th className="px-3 py-4">Carrera</th>
                    <th className="px-3 py-4">Semestre</th>
                    <th className="px-3 py-4">Promedio</th>
                    <th className="px-3 py-4">Estado</th>
                    <th className="px-3 py-4 text-right">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {alumnos.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                            No hay alumnos que coincidan con tu búsqueda.
                        </td>
                    </tr>
                ) : (
                    alumnos.map((a) => (
                        <FilaAlumno
                            key={a.id}
                            alumno={a}
                            idVisible={idVisible(a)}
                            mostrarCalificaciones={mostrarCalificaciones}
                            menuAbierto={menuAbierto === a.id}
                            onToggleMenu={() => onToggleMenu(a.id)}
                            onCambiarEstado={() => onCambiarEstado(a.id)}
                            onCambiarCalificacion={(valor: number) => onCambiarCalificacion(a.id, valor)}
                            onEliminar={() => onEliminar(a.id)}
                        />
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}