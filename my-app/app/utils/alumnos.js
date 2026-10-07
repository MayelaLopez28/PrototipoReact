export function idVisible(alumno) {
    return `AL-2024-${String(alumno.id).padStart(3, "0")}`;
}