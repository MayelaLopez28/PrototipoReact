"use client";
import { useEffect, useMemo, useState } from "react";
import type { Alumno, FiltroEstado } from "./types";
import { ALUMNOS_INICIALES } from "./data/alumnos";
import { idVisible } from "./utils/alumnos";
import EncabezadoPagina from "./components/EncabezadoPagina";
import TarjetasResumen from "./components/TarjetasResumen";
import BarraHerramientas from "./components/BarraHerramientas";
import TablaAlumnos from "./components/TablaAlumnos";
import Paginacion from "./components/Paginacion";
import ModalAlumno from "./components/ModalAlumno";

const POR_PAGINA = 5;

export default function Home() {
  const [alumnos, setAlumnos] = useState<Alumno[]>(ALUMNOS_INICIALES);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("todos");
  const [mostrarCalificaciones, setMostrarCalificaciones] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [menuAbierto, setMenuAbierto] = useState<number | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const cerrarMenu = () => setMenuAbierto(null);
    document.addEventListener("click", cerrarMenu);
    return () => document.removeEventListener("click", cerrarMenu);
  }, []);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return alumnos.filter((a) => {
      const coincideEstado =
          filtroEstado === "todos" || (filtroEstado === "activo" ? a.activo : !a.activo);
      const coincideTexto =
          !q ||
          [a.nombre, a.correo, a.carrera, idVisible(a), `${a.semestre}`]
              .join(" ")
              .toLowerCase()
              .includes(q);
      return coincideEstado && coincideTexto;
    });
  }, [alumnos, busqueda, filtroEstado]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const inicio = (paginaActual - 1) * POR_PAGINA;
  const visibles = filtrados.slice(inicio, inicio + POR_PAGINA);

  const cambiarBusqueda = (valor: string) => {
    setBusqueda(valor);
    setPagina(1);
  };

  const cambiarFiltro = (valor: FiltroEstado) => {
    setFiltroEstado(valor);
    setPagina(1);
  };

  const cambiarEstado = (id: number) => {
    setAlumnos(alumnos.map((a) => (a.id === id ? { ...a, activo: !a.activo } : a)));
    setMenuAbierto(null);
  };

  const cambiarCalificacion = (id: number, calificacion: number) => {
    setAlumnos(alumnos.map((a) => (a.id === id ? { ...a, promedio: calificacion } : a)));
  };

  const eliminar = (id: number) => {
    setAlumnos(alumnos.filter((a) => a.id !== id));
    setMenuAbierto(null);
  };

  const agregarAlumno = (datos: Omit<Alumno, "id">) => {
    const nuevoId = Math.max(0, ...alumnos.map((a) => a.id)) + 1;
    setAlumnos([...alumnos, { ...datos, id: nuevoId }]);
    setModalAbierto(false);
  };

  return (
      <main className="mx-auto w-full max-w-5xl p-6">
        <EncabezadoPagina onAgregar={() => setModalAbierto(true)} />
        <TarjetasResumen alumnos={alumnos} />

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white">
          <BarraHerramientas
              busqueda={busqueda}
              onBusqueda={cambiarBusqueda}
              mostrarCalificaciones={mostrarCalificaciones}
              onToggleCalificaciones={() => setMostrarCalificaciones(!mostrarCalificaciones)}
              filtroEstado={filtroEstado}
              onFiltroEstado={cambiarFiltro}
          />
          <TablaAlumnos
              alumnos={visibles}
              mostrarCalificaciones={mostrarCalificaciones}
              menuAbierto={menuAbierto}
              onToggleMenu={(id) => setMenuAbierto(menuAbierto === id ? null : id)}
              onCambiarEstado={cambiarEstado}
              onCambiarCalificacion={cambiarCalificacion}
              onEliminar={eliminar}
          />
          <Paginacion
              inicio={inicio}
              mostrados={visibles.length}
              total={filtrados.length}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPagina}
          />
        </section>

        {modalAbierto && (
            <ModalAlumno onCerrar={() => setModalAbierto(false)} onGuardar={agregarAlumno} />
        )}
      </main>
  );
}