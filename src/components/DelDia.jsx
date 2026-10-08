import { useEffect, useState } from "react";

// Lista de pasajes conocidos; cada día se muestra uno distinto
const referencias = [
  "john 3:16",
  "psalms 23:1-3",
  "proverbs 3:5-6",
  "philippians 4:13",
  "joshua 1:9",
  "isaiah 41:10",
  "romans 8:28",
];

export default function DelDia() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  const dia = Math.floor(Date.now() / 86400000);
  const referencia = referencias[dia % referencias.length];

  useEffect(() => {
    fetch(`https://bible-api.com/${encodeURIComponent(referencia)}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el versículo");
        return res.json();
      })
      .then(setDatos)
      .catch((err) => setError(err.message));
  }, [referencia]);

  if (error) return <p>{error}</p>;
  if (!datos) return <p>Cargando...</p>;

  return (
    <section>
      <h1>Versículo del día</h1>
      <h2>{datos.reference}</h2>
      <p>{datos.text}</p>
    </section>
  );
}