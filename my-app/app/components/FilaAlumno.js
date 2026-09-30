export default function FilaAlumno({ nombre, apellido, carrera }) {
    return (
        <tr>
            <td>
                <div className="flexbox flex-row">
                    <img src="student.png" width="50" height="50" className="estudianteAvatar" />
                    <span>{nombre}</span>
                </div>
            </td>
            <td>{apellido}</td>
            <td>{carrera}</td>
        </tr>
    );
}