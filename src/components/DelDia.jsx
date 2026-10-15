import { useEffect, useState } from "react";

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
  const [indice, setIndice] = useState(
    Math.floor(Date.now() / 86400000) % referencias.length
  );
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setDatos(null);
    setError(null);
    fetch(`https://bible-api.com/${encodeURIComponent(referencias[indice])}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el pasaje");
        return res.json();
      })
      .then(setDatos)
      .catch((err) => setError(err.message));
  }, [indice]);

  const otro = () => setIndice((indice + 1) % referencias.length);

  return (
    <section>
      <h1>Pan del día</h1>
      <img src="./pan.jpg" alt="" className="pan-img" />
      <p>Un pasaje para alimentarte hoy.</p>
      {error && <p>{error}</p>}
      {!datos && !error && <p>Horneando...</p>}
      {datos && (
        <>
          <h2>{datos.reference}</h2>
          <p>{datos.text}</p>
        </>
      )}
      <button onClick={otro}>Otro pan</button>
    </section>
  );
}