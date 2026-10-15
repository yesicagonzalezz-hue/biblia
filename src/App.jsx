import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

import Portada from "./components/Portada";
import Libros from "./components/Libros";
import Guardados from "./components/Guardados";
import DelDia from "./components/DelDia";
import Acerca from "./components/Acerca";
import Perfil from "./components/Perfil";
import Capitulo from "./components/Capitulo";
import "./App.css";

export default function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2500);
    return () => clearTimeout(t);
  }, []);

  const cerrarMenu = () => setMenuAbierto(false);

  if (splash) {
    return (
      <div className="splash">
        <img src="./logo.png" alt="La Biblia" className="splash-logo" />
      </div>
    );
  }

  return (
    <HashRouter>
      <header className="barra-superior">
        <button className="boton-menu" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰
        </button>
        <span>La Biblia</span>
      </header>

      {menuAbierto && (
        <div className="panel-menu">
          <NavLink to="/perfil" onClick={cerrarMenu}>Perfil</NavLink>
          <NavLink to="/acerca" onClick={cerrarMenu}>Acerca de la app</NavLink>
          <NavLink to="/guardados" onClick={cerrarMenu}>Mis guardados</NavLink>
        </div>
      )}

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Portada />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/guardados" element={<Guardados />} />
          <Route path="/del-dia" element={<DelDia />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/capitulo/:libro/:cap" element={<Capitulo />} />
        </Routes>
      </main>

      <nav className="pestanas">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/libros">Libros</NavLink>
        <NavLink to="/guardados">Guardados</NavLink>
        <NavLink to="/del-dia">Pan del día</NavLink>
        <NavLink to="/acerca">Info</NavLink>
      </nav>
    </HashRouter>
  );
}