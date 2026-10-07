import { useEffect, useRef, useState } from "react";

const COLORES = [
    "bg-violet-100 text-violet-700",
    "bg-blue-100 text-blue-700",
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
];

function iniciales(nombre) {
    return nombre
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join("");
}

export default function FilaAlumno({
                                       alumno,
                                       idVisible,
                                       mostrarCalificaciones,
                                       onCambiarEstado,
                                       onCambiarCalificacion,
                                       onEliminar,
                                   }) {
    const reprobado = alumno.promedio < 70;
    const color = COLORES[alumno.id % COLORES.length];
    const [editando, setEditando] = useState(false);
    const [valor, setValor] = useState("");
    const [invalido, setInvalido] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [posicion, setPosicion] = useState({ right: 0, top: 0 });
    const botonRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menuAbierto) return;

        const clicFuera = (e) => {
            if (menuRef.current && menuRef.current.contains(e.target)) {
                return;
            }

            if (botonRef.current && botonRef.current.contains(e.target)) {
                return;
            }
            setMenuAbierto(false);
        };
        const teclado = (e) => {
            if (e.key === "Escape") {
                setMenuAbierto(false);
            }
        };
        const cerrar = () => setMenuAbierto(false);

        document.addEventListener("mousedown", clicFuera);
        document.addEventListener("keydown", teclado);
        window.addEventListener("scroll", cerrar, true);
        window.addEventListener("resize", cerrar);
        return () => {
            document.removeEventListener("mousedown", clicFuera);
            document.removeEventListener("keydown", teclado);
            window.removeEventListener("scroll", cerrar, true);
            window.removeEventListener("resize", cerrar);
        };
    }, [menuAbierto]);

    const alternarMenu = () => {
        if (!menuAbierto && botonRef.current) {
            const rect = botonRef.current.getBoundingClientRect();
            const caeAbajo = rect.bottom + 160 < window.innerHeight;
            setPosicion({
                right: window.innerWidth - rect.right,
                ...(caeAbajo
                    ? { top: rect.bottom + 4 }
                    : { bottom: window.innerHeight - rect.top + 4 }),
            });
        }
        setMenuAbierto(!menuAbierto);
    };

    const iniciarEdicion = () => {
        setValor(String(alumno.promedio));
        setInvalido(false);
        setEditando(true);
        setMenuAbierto(false);
    };

    const cambiarEstado = () => {
        setMenuAbierto(false);
        if (onCambiarEstado) onCambiarEstado();
    };

    const eliminar = () => {
        setMenuAbierto(false);
        if (onEliminar) onEliminar();
    };

    const guardar = () => {
        const numero = parseFloat(valor);
        if (valor.trim() === "" || isNaN(numero) || numero < 0 || numero > 100) {
            setInvalido(true);
            return;
        }

        if (onCambiarCalificacion) {
            onCambiarCalificacion(numero);
        }
        setEditando(false);
    };

    const cancelar = () => setEditando(false);

    return (
        <tr className="border-t border-slate-100 hover:bg-slate-50/60">
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${color}`}>
                        {iniciales(alumno.nombre)}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900">{alumno.nombre}</p>
                        <p className="text-sm text-slate-500">{alumno.correo}</p>
                    </div>
                </div>
            </td>

            <td className="px-3 py-4 text-slate-500">{idVisible}</td>
            <td className="px-3 py-4 font-medium text-slate-600">{alumno.carrera}</td>
            <td className="px-3 py-4 text-slate-500">{alumno.semestre}°</td>

            <td
                className={`px-3 py-4 font-bold ${
                    reprobado ? "text-rose-600" : "text-slate-800"
                } ${reprobado && !mostrarCalificaciones && !editando ? "invisible" : ""}`}
            >
                {editando ? (
                    <div className="flex items-center gap-1">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            autoFocus
                            value={valor}
                            aria-label={`Nueva calificación de ${alumno.nombre}`}
                            onChange={(e) => {
                                setValor(e.target.value);
                                setInvalido(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                    guardar();
                                }
                                if (e.key === "Escape") {
                                    cancelar();
                                }
                            }}
                            className={`w-20 rounded-lg border bg-white px-2 py-1 text-slate-800 outline-none focus:ring-4 ${
                                invalido
                                    ? "border-rose-500 focus:ring-rose-100"
                                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                            }`}
                        />
                        <button type="button" onClick={guardar} aria-label="Guardar calificación" className="rounded-lg px-2 py-1 text-emerald-600 hover:bg-emerald-50">
                            ✓
                        </button>
                        <button type="button" onClick={cancelar} aria-label="Cancelar" className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100">
                            ✕
                        </button>
                    </div>
                ) : (
                    alumno.promedio
                )}
            </td>

            <td className="px-3 py-4">
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                alumno.activo ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
            }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${alumno.activo ? "bg-emerald-500" : "bg-slate-400"}`} />
            {alumno.activo ? "Activo" : "Inactivo"}
        </span>
            </td>

            <td className="px-3 py-4 text-right">
                <button
                    ref={botonRef}
                    type="button"
                    onClick={alternarMenu}
                    aria-label="Acciones"
                    aria-expanded={menuAbierto}
                    className="rounded-lg px-2 py-1 text-xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                    ···
                </button>

                {menuAbierto && (
                    <div
                        ref={menuRef}
                        style={posicion}
                        className="fixed z-50 w-52 rounded-xl border border-slate-200 bg-white p-1 text-left text-sm shadow-lg"
                    >
                        <button
                            type="button"
                            onClick={iniciarEdicion}
                            className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
                        >
                            Cambiar calificación
                        </button>
                        <button
                            type="button"
                            onClick={cambiarEstado}
                            className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
                        >
                            Cambiar a {alumno.activo ? "inactivo" : "activo"}
                        </button>
                        <button
                            type="button"
                            onClick={eliminar}
                            className="block w-full rounded-lg px-3 py-2 text-left text-rose-600 hover:bg-rose-50"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}