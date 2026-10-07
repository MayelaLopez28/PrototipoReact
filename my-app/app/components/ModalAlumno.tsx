import { useEffect, useState, FormEvent } from "react";
import Icono, { ICONOS } from "./Icono";
import { estiloCampo, estiloBotonSec, estiloBotonPrimario } from "../utils/estilos";
import type { Alumno } from "../types";

type Props = {
    onCerrar: () => void;
    onGuardar: (datos: Omit<Alumno, "id">) => void;
};

export default function ModalAlumno({ onCerrar, onGuardar }: Props) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [carrera, setCarrera] = useState("");
    const [semestre, setSemestre] = useState("");
    const [promedio, setPromedio] = useState("");
    const [activo, setActivo] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const teclado = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCerrar();
        };
        document.addEventListener("keydown", teclado);
        return () => document.removeEventListener("keydown", teclado);
    }, [onCerrar]);

    const enviar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sem = Number(semestre);
        const prom = parseFloat(promedio);

        if (!nombre.trim() || !correo.trim() || !carrera.trim() || !semestre.trim() || !promedio.trim()) {
            setError("Llena todos los campos obligatorios (*).");
            return;
        }
        if (!correo.includes("@")) {
            setError("Ingresa un correo válido.");
            return;
        }
        if (!Number.isInteger(sem) || sem < 1 || sem > 15) {
            setError("El semestre debe ser un número entero entre 1 y 15.");
            return;
        }
        if (isNaN(prom) || prom < 0 || prom > 100) {
            setError("El promedio debe estar entre 0 y 100.");
            return;
        }

        onGuardar({
            nombre: nombre.trim(),
            correo: correo.trim(),
            carrera: carrera.trim().toUpperCase(),
            semestre: sem,
            promedio: prom,
            activo,
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
            onClick={onCerrar}
        >
            <form
                onSubmit={enviar}
                onClick={(e) => e.stopPropagation()}
                noValidate
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-modal"
                className="max-h-full w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
                <div className="flex items-start justify-between border-b border-slate-100 p-7">
                    <div>
                        <h2 id="titulo-modal" className="text-2xl font-bold text-slate-900">
                            Agregar nuevo alumno
                        </h2>
                        <p className="mt-1 text-slate-500">Captura la información académica del alumno.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar"
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                    >
                        <Icono d={ICONOS.cerrar} />
                    </button>
                </div>

                <div className="grid gap-5 p-7 sm:grid-cols-2">
                    <div className="flex flex-col gap-2 sm:col-span-2">
                        <label htmlFor="nombre" className="text-sm font-semibold text-slate-600">
                            Nombre completo *
                        </label>
                        <input id="nombre" autoFocus value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Andrea López" className={estiloCampo} />
                    </div>

                    <div className="flex flex-col gap-2 sm:col-span-2">
                        <label htmlFor="correo" className="text-sm font-semibold text-slate-600">
                            Correo institucional *
                        </label>
                        <input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="nombre@alumnos.edu" className={estiloCampo} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="carrera" className="text-sm font-semibold text-slate-600">
                            Carrera *
                        </label>
                        <input id="carrera" value={carrera} onChange={(e) => setCarrera(e.target.value)} placeholder="Ej. LMAD" className={estiloCampo} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="semestre" className="text-sm font-semibold text-slate-600">
                            Semestre *
                        </label>
                        <input id="semestre" type="number" min="1" max="15" value={semestre} onChange={(e) => setSemestre(e.target.value)} placeholder="Ej. 4" className={estiloCampo} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="promedio" className="text-sm font-semibold text-slate-600">
                            Promedio *
                        </label>
                        <input id="promedio" type="number" min="0" max="100" value={promedio} onChange={(e) => setPromedio(e.target.value)} placeholder="0–100" className={estiloCampo} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="estado" className="text-sm font-semibold text-slate-600">
                            Estado
                        </label>
                        <select id="estado" value={activo ? "activo" : "inactivo"} onChange={(e) => setActivo(e.target.value === "activo")} className={estiloCampo}>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>

                    {error && <p className="text-sm font-medium text-rose-600 sm:col-span-2">{error}</p>}
                </div>

                <div className="flex justify-end gap-3 px-7 pb-7">
                    <button type="button" onClick={onCerrar} className={estiloBotonSec}>
                        Cancelar
                    </button>
                    <button type="submit" className={estiloBotonPrimario}>
                        <Icono d={ICONOS.mas} className="h-4 w-4" /> Guardar alumno
                    </button>
                </div>
            </form>
        </div>
    );
}