export default function Acerca() {
  return (
    <section>
      <h1>Acerca de Biblia App</h1>

      <h3>¿Qué es?</h3>
      <p>
        Una app para leer la Biblia por libros y capítulos, guardar tus
        capítulos favoritos y compartir pasajes con otras personas.
      </p>

      <h3>¿De dónde vienen los datos?</h3>
      <p>
        Los textos se consultan en línea a la API pública{" "}
        <strong>bible-api.com</strong>, que entrega los versículos en formato
        JSON. La traducción usada es la World English Bible, de dominio público.
      </p>

      <h3>¿Qué puedes hacer?</h3>
      <ul>
        <li>Buscar y filtrar libros por testamento.</li>
        <li>Leer cualquier capítulo con sus versículos.</li>
        <li>Guardar capítulos en Guardados.</li>
        <li>Compartir un pasaje.</li>
        <li>Ver un versículo distinto cada día.</li>
      </ul>

      <h3>Tecnologías</h3>
      <p>React, Vite y React Router.</p>

      <h3>Autoría</h3>
      <p>Hecho por: Yesica Gonzalez Zambrano</p>
    </section>
  );
}