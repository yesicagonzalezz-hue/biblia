import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CLAVE = "biblia-guardados";

const leerGuardados = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
};

export default function Capitulo() {
  const { libro, cap } = useParams();
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [guardados, setGuardados] = useState(leerGuardados);

  const id = `${libro}/${cap}`;
  const estaGuardado = guardados.some((g) => g.id === id);

  const alternarGuardado = () => {
    const nuevos = estaGuardado
      ? guardados.filter((g) => g.id !== id)
      : [...guardados, { id, libro, cap, referencia: datos.reference }];
    localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    setGuardados(nuevos);
  };

    const compartir = async () => {
    const texto =
      `${datos.reference}\n\n` +
      datos.verses
        .slice(0, 3)
        .map((v) => `${v.verse}. ${v.text.trim()}`)
        .join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ title: datos.reference, text: texto });
      } else {
        await navigator.clipboard.writeText(texto);
        alert("Texto copiado al portapapeles");
      }
    } catch {
      // la persona canceló el menú de compartir
    }
  };

  useEffect(() => {
    setDatos(null);
    setError(null);
    fetch(`https://bible-api.com/${encodeURIComponent(`${libro} ${cap}`)}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se encontró el capítulo");
        return res.json();
      })
      .then(setDatos)
      .catch((err) => setError(err.message));
  }, [libro, cap]);

  if (error) return <p>{error}</p>;
  if (!datos) return <p>Cargando...</p>;

  return (
    <section>
      <h2>{datos.reference}</h2>
      <button onClick={alternarGuardado}>
        {estaGuardado ? "★ Quitar de guardados" : "☆ Guardar capítulo"}
      </button>
            <button onClick={compartir}>Compartir</button>
      {datos.verses.map((v) => (
        <p key={v.verse}>
          <strong>{v.verse}.</strong> {v.text}
        </p>
      ))}
    </section>
  );
}