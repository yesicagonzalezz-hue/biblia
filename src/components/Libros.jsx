import { useState } from "react";
import { Link } from "react-router-dom";

const categorias = [
  {
    titulo: "Antiguo Testamento: Ley",
    libros: [["Génesis", "genesis"], ["Éxodo", "exodus"], ["Levítico", "leviticus"], ["Números", "numbers"], ["Deuteronomio", "deuteronomy"]],
  },
  {
    titulo: "Antiguo Testamento: Historia",
    libros: [["Josué", "joshua"], ["Jueces", "judges"], ["Rut", "ruth"], ["1 Samuel", "1 samuel"], ["2 Samuel", "2 samuel"], ["1 Reyes", "1 kings"], ["2 Reyes", "2 kings"], ["1 Crónicas", "1 chronicles"], ["2 Crónicas", "2 chronicles"], ["Esdras", "ezra"], ["Nehemías", "nehemiah"], ["Ester", "esther"]],
  },
  {
    titulo: "Antiguo Testamento: Poesía",
    libros: [["Job", "job"], ["Salmos", "psalms"], ["Proverbios", "proverbs"], ["Eclesiastés", "ecclesiastes"], ["Cantares", "song of solomon"]],
  },
  {
    titulo: "Antiguo Testamento: Profetas",
    libros: [["Isaías", "isaiah"], ["Jeremías", "jeremiah"], ["Lamentaciones", "lamentations"], ["Ezequiel", "ezekiel"], ["Daniel", "daniel"], ["Oseas", "hosea"], ["Joel", "joel"], ["Amós", "amos"], ["Abdías", "obadiah"], ["Jonás", "jonah"], ["Miqueas", "micah"], ["Nahúm", "nahum"], ["Habacuc", "habakkuk"], ["Sofonías", "zephaniah"], ["Hageo", "haggai"], ["Zacarías", "zechariah"], ["Malaquías", "malachi"]],
  },
  {
    titulo: "Nuevo Testamento: Evangelios y Hechos",
    libros: [["Mateo", "matthew"], ["Marcos", "mark"], ["Lucas", "luke"], ["Juan", "john"], ["Hechos", "acts"]],
  },
  {
    titulo: "Nuevo Testamento: Cartas",
    libros: [["Romanos", "romans"], ["1 Corintios", "1 corinthians"], ["2 Corintios", "2 corinthians"], ["Gálatas", "galatians"], ["Efesios", "ephesians"], ["Filipenses", "philippians"], ["Colosenses", "colossians"], ["1 Tesalonicenses", "1 thessalonians"], ["2 Tesalonicenses", "2 thessalonians"], ["1 Timoteo", "1 timothy"], ["2 Timoteo", "2 timothy"], ["Tito", "titus"], ["Filemón", "philemon"], ["Hebreos", "hebrews"], ["Santiago", "james"], ["1 Pedro", "1 peter"], ["2 Pedro", "2 peter"], ["1 Juan", "1 john"], ["2 Juan", "2 john"], ["3 Juan", "3 john"], ["Judas", "jude"]],
  },
  {
    titulo: "Nuevo Testamento: Apocalipsis",
    libros: [["Apocalipsis", "revelation"]],
  },
];

const sinTildes = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Libros() {
  const [busqueda, setBusqueda] = useState("");
  const [testamento, setTestamento] = useState("Todos");

  const visibles = categorias
    .filter((cat) => testamento === "Todos" || cat.titulo.startsWith(testamento))
    .map((cat) => ({
      ...cat,
      libros: cat.libros.filter(([nombre]) =>
        sinTildes(nombre).includes(sinTildes(busqueda))
      ),
    }))
    .filter((cat) => cat.libros.length > 0);

  return (
    <section>
      <h1>Libros</h1>

      <input
        type="text"
        placeholder="Buscar libro..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
      />

      <div style={{ display: "flex", gap: "8px", margin: "12px 0" }}>
        {["Todos", "Antiguo Testamento", "Nuevo Testamento"].map((opcion) => (
          <button
            key={opcion}
            onClick={() => setTestamento(opcion)}
            style={{ fontWeight: testamento === opcion ? "bold" : "normal" }}
          >
            {opcion}
          </button>
        ))}
      </div>

      {visibles.length === 0 && <p>No se encontraron libros.</p>}

      {visibles.map((cat) => (
        <div key={cat.titulo}>
          <div className="cat-titulo">
  <img
    src={cat.titulo.startsWith("Antiguo") ? "./pan.jpg" : "./iglesia.jpg"}
    alt=""
    className="cat-img"
  />
  <h2>{cat.titulo}</h2>
</div><div className="cat-titulo">
  <img
    src={cat.titulo.startsWith("Antiguo") ? "./pan.jpg" : "./iglesia.jpg"}
    alt=""
    className="cat-img"
  />
  <h2>{cat.titulo}</h2>
  </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {cat.libros.map(([nombre, api]) => (
              <Link key={api} to={`/capitulo/${encodeURIComponent(api)}/1`}>
                {nombre}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}