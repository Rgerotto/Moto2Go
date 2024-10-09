import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Nav.css'

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const openNav = () => setIsOpen(true);
    const closeNav = () => setIsOpen(false);
  
  return (
    <nav>
      <div className='logo-nav'>
        <Link to='/'>
        <img src="../img/moto2go_clear.png" alt="" srcSet="" />
        </Link>
      </div>

      {/* Botão para abrir o overlay */}
      <span className="menu" onClick={openNav} style={{ cursor: "pointer" }}>
        &#9776;
      </span>

      {/* Overlay */}
      <div
        id="myNav"
        className="overlay"
        style={{ height: isOpen ? "100%" : "0" }}
      >
        {/* Botão para fechar o overlay */}
        <a href="#" className="closebtn" onClick={closeNav}>
          &times;
        </a>

        {/* Conteúdo do overlay */}
        <div className="overlay-content">
        <Link to="/">
            <p>home</p>
          </Link>
          <Link to="/about">
            <p>Sobre</p>
          </Link>
          <Link to="/contact">
            <p>contacto</p>
          </Link>
          <Link to="/moto2go/admin">
            <p>admin</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;