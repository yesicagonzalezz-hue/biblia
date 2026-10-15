import { Link } from "react-router-dom";

export default function Portada() {
  return (
    <section className="portada">
      <img src="./logo.png" alt="La Biblia" className="portada-logo" />
      <p>Tu pan de cada día: lee, guarda y comparte la Palabra.</p>
      <Link to="/libros">Empezar a leer</Link>
    </section>
  );
}