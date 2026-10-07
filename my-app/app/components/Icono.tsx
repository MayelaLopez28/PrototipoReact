export const ICONOS = {
    buscar: "M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z",
    ojo: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
    ojoTachado:
        "M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.9 5.1A9.7 9.7 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 4M6.6 6.6A17 17 0 002 12s3.5 7 10 7a9.7 9.7 0 004.1-.9",
    cerrar: "M18 6L6 18M6 6l12 12",
    mas: "M12 5v14M5 12h14",
    izq: "M15 18l-6-6 6-6",
    der: "M9 18l6-6-6-6",
};

type Props = { d: string; className?: string };

export default function Icono({ d, className = "h-5 w-5" }: Props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d={d} />
        </svg>
    );
}