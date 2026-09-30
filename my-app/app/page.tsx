"use client";
import { useState } from "react";
import FilaAlumno from "./components/FilaAlumno";

export default function Home() {
  const [mensaje, setMensaje] = useState("");

  const [alumnos, setAlumnos] = useState([
    { nombre: "Mayela Mayte", apellido: "Lopez Cerino", carrera: "LCC" },
    { nombre: "Andrea Sofia", apellido: "Lopez Cerino", carrera: "LMAD" },
    { nombre: "Regina Dariela", apellido: "Sosa Huerta", carrera: "LSTI" },
  ]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [carrera, setCarrera] = useState("");

  const agregarAlumno = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !carrera.trim()) {
      setMensaje("Por favor llena todos los campos.");
      return;
    }

    const nuevoAlumno = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      carrera: carrera.trim(),
    };

    setAlumnos([...alumnos, nuevoAlumno]);

    setNombre("");
    setApellido("");
    setCarrera("");
    setMensaje("Alumno agregado correctamente.");
  };

  return (
      <div>
        <h1>Alumnos</h1>

        <section>
          <h2>Agregar alumno</h2>

          <form onSubmit={agregarAlumno}>
            <label htmlFor="nombre">Nombre del alumno: </label>
            <input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <label htmlFor="apellido">Apellido del alumno: </label>
            <input
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
            />

            <label htmlFor="carrera">Carrera del alumno: </label>
            <input
                id="carrera"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
            />

            <button type="submit">Agregar</button>
          </form>

          {mensaje && <p>{mensaje}</p>}
        </section>

        <table>
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Carrera</th>
          </tr>
          </thead>

          <tbody>
          {alumnos.map((alumno, index) => (
              <FilaAlumno
                  key={index}
                  nombre={alumno.nombre}
                  apellido={alumno.apellido}
                  carrera={alumno.carrera}
              />
          ))}
          </tbody>
        </table>
      </div>
  );
}