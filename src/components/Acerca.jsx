const ingredientes = [
  ["🌾", "El grano", "Los textos vienen de bible-api.com, traducción World English Bible (dominio público)."],
  ["⚛️", "La masa", "Interfaz hecha con React y Vite."],
  ["🧭", "El horno", "Navegación entre pantallas con React Router."],
  ["🧺", "La alforja", "Tus guardados se quedan en la memoria del dispositivo."],
];

const pasos = [
  "Busca un libro o filtra por testamento.",
  "Abre un capítulo y lee sus versículos.",
  "Guarda los capítulos que quieras releer.",
  "Comparte un pasaje con quien quieras.",
  "Vuelve cada día por tu pan del día.",
];

export default function Acerca() {
  return (
    <section>
      <div className="info-hero">
        <div className="info-hero-icono">🍞</div>
        <h1>La receta de La Biblia</h1>
        <p>Una app para leer la Palabra como pan de cada día.</p>
      </div>

      <h2>Ingredientes</h2>
      {ingredientes.map(([icono, titulo, texto]) => (
        <div className="info-tarjeta" key={titulo}>
          <span className="info-icono">{icono}</span>
          <div>
            <strong>{titulo}</strong>
            <p>{texto}</p>
          </div>
        </div>
      ))}

      <h2>Preparación</h2>
      {pasos.map((paso, i) => (
        <div className="info-paso" key={paso}>
          <span className="info-numero">{i + 1}</span>
          <p>{paso}</p>
        </div>
      ))}

      <p className="info-firma">Hecha con cariño por Yesica González</p>
    </section>
  );
}