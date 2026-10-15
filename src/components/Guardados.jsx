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
        <div className="vacio">
          <img src="./biblia.jpg" alt="" className="vacio-img" />
          <p>Tu alforja está vacía. Abre un capítulo desde Libros y toca "Guardar".</p>
        </div>
      )}
      {guardados.map((g) => (
        <div key={g.id} className="guardado">
          <img src="./biblia.jpg" alt="" className="guardado-img" />
          <Link to={`/capitulo/${encodeURIComponent(g.libro)}/${g.cap}`}>
            {g.referencia}
          </Link>
          <button onClick={() => quitar(g.id)}>Quitar</button>
        </div>
      ))}
    </section>
  );
}