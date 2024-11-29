import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/ECHome.css';
import '../assets/styles/ECLogin.css';
import logo from '../assets/images/LogoSin 1.svg';
import excel from '../assets/images/excel.png';
import profe1 from '../assets/images/profesor1.png';
import diseno from '../assets/images/diseno.png';
import marketing from '../assets/images/marketing.png';
import desarrollo from '../assets/images/desarrollo.png';
import hero from '../assets/images/hero-edu.png';

const Home = () => {
  return (
    <div>
      <header>
        <div className="ec-logo-title">
          <a className="ec-logo" href="#">
            <div className="ec-logo-image">
              <img src={logo} alt="Logo EduConnect" />
            </div>
            <p className="ec-logo-text">EduConnect</p>
          </a>
        </div>
        <div>
          <Link to="/registro">
            <button>Registrarse</button>
          </Link>
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
        </div>
      </header>

    <section className="hero">
        <div className="hero-content">
            <div className="hero-image">
                <img src={hero} alt="EduConnect" />
            </div>
            <div className="hero-text">
                <h1>Descubre tu Potencial con EduConnect</h1>
                <p>
                Aprender nunca ha sido tan fácil ni tan emocionante. Con EduConnect,
                puedes tomar los cursos que realmente importan.
                </p>
                <button>Empezar</button>
            </div>
        </div>
    </section>

      <section className="section">
        <h2>Cursos Destacados</h2>
        <div className="courses">
          <div className="course-card">
            <img src={excel} alt="Excel" />
          </div>
          <div className="course-card">
            <img src={excel} alt="Excel" />
          </div>
          <div className="course-card">
            <img src={excel} alt="Excel" />
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Profesores Destacados</h2>
        <div className="professors">
          <div className="professor-card">
            <img src={profe1} alt="Jorge Ipanque" />
            <h3>Jorge Ipanque</h3>
            <p>Ingeniero de Software</p>
          </div>
          <div className="professor-card">
            <img src={profe1} alt="Jorge Ipanque" />
            <h3>Jorge Ipanque</h3>
            <p>Ingeniero de Software</p>
          </div>
          <div className="professor-card">
            <img src={profe1} alt="Jorge Ipanque" />
            <h3>Jorge Ipanque</h3>
            <p>Ingeniero de Software</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Categorías Destacadas</h2>
        <div className="categories">
          <div className="category-card">
            <img src={diseno} alt="Diseño" />
            <h3>Diseño</h3>
          </div>
          <div className="category-card">
            <img src={desarrollo} alt="Desarrollo" />
            <h3>Desarrollo</h3>
          </div>
          <div className="category-card">
            <img src={marketing} alt="Marketing" />
            <h3>Marketing</h3>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-column">
            <h3>Desarrolladores</h3>
            <ul>
              <li>Cosme Fulanito, Rolando Cecilia</li>
              <li>Ernesto Ramírez, Jorge Ipanque</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Sobre EduConnect</h3>
            <ul>
              <li><a href="#">Historia</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <p>Email: contacto@educonnect.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 EduConnect</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;