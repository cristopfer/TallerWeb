import React from "react";
import logo from '../assets/images/LogoSin 1.svg';
import '../assets/styles/ECSetProfesor.css';

const Sidebar = () => (
    <aside className="sidebar">
      <div className="ec-logo-title">
          <a className="ec-logo" href="#">
              <div className="ec-logo-image">
                <img src={logo} alt="Logo EduConnect" />
              </div>
              <p className="ec-logo-text">EduConnect</p>
          </a>
      </div>
      <nav>
          <ul>
              <li className="active">Dashboard</li>
              <li>Crear Nuevo Curso</li>
              <li>Mis Cursos</li>
              <li>Salario</li>
              <li>Inbox</li>
          </ul>
      </nav>
        <footer>
            CONFIGURACION
            <button className="butSettings">Configuracion</button>
            <button className="butLogout">Cerrar Sesion</button>
        </footer>
    </aside>
);

export default Sidebar;