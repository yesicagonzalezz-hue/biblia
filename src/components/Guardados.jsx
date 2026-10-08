import { useState } from "react";
import { Link } from "react-router-dom";

const CLAVE = "biblia-guardados";

const leerGuardados = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
};

export default function Guardados() {
  const [guardados, setGuardados] = useState(leerGuardados);

  const quitar = (id) => {
    const nuevos = guardados.filter((g) => g.id !== id);
    localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    setGuardados(nuevos);
  };

  return (
    <section>
      <h1>Guardados</h1>
      {guardados.length === 0 && (
        <p>Aún no has guardado capítulos. Abre uno desde Libros y toca "Guardar".</p>
      )}
      {guardados.map((g) => (
        <div
          key={g.id}
          style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}
        >
          <Link to={`/capitulo/${encodeURIComponent(g.libro)}/${g.cap}`}>
            {g.referencia}
          </Link>
          <button onClick={() => quitar(g.id)}>Quitar</button>
        </div>
      ))}
    </section>
  );
}