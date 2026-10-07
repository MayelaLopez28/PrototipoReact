export type Alumno = {
    id: number;
    nombre: string;
    correo: string;
    carrera: string;
    semestre: number;
    promedio: number;
    activo: boolean;
};

export type FiltroEstado = "todos" | "activo" | "inactivo";