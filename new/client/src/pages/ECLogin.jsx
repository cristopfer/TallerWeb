import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/LogoSin 1.svg';
import facebookIcon from '../assets/images/Vector (1).svg';
import githubIcon from '../assets/images/Vector (2).svg';
import youtubeIcon from '../assets/images/Vector.svg';
import '../assets/styles/ECLogin.css';

function ECLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/usuario/ingresar', credentials, {
        withCredentials: true, 
      });
      const { estado } = response.data;
      if (estado === 1) {
        window.location.href = '/buscador';
      } else if (estado === 2) {
        window.location.href = '/profesor';
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className="ec-login-container">
      <header className="ec-header">
        <div className="ec-logo-title">
          <a className="ec-logo" href="#">
            <div className="ec-logo-image">
              <img src={logo} alt="Logo EduConnect" />
            </div>
            <p className="ec-logo-text">EduConnect</p>
          </a>
        </div>
        <nav className="ec-nav">
          <Link to="/registro">
            <button>Registrarse</button>
          </Link>
        </nav>
      </header>

      <section className="ec-login-section">
        <div className="ec-login-panel">
          <div className="ec-panel-heading">Inicia Sesión</div>
          <div className="ec-panel-body">
            {error && <div className="ec-error-message">{error}</div>}
            <input
              type="text"
              name="username"
              placeholder="Email"
              value={credentials.username}
              onChange={handleInputChange}
              className="ec-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleInputChange}
              className="ec-input"
            />
            <button onClick={handleLogin} className="ec-login-button">
              Iniciar Sesión
            </button>
            <p className="ec-login-footer">
              ¿No tienes una cuenta? <a href="/register" className="ec-register-link">Regístrate gratis</a>
              <br />
              <a href="/forgot-password" className="ec-forgot-password-link">¿Olvidaste tu contraseña?</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="ec-footer">
        <div className="ec-footer-content">
          <div className="ec-footer-section">
            <h4>Desarrolladores</h4>
            <p>Rosmeri Gloria, Andrei Dinca, Annie Katerine...</p>
          </div>
          <div className="ec-footer-section">
            <h4>Sobre EduConnect</h4>
            <a href="/about">Nosotros</a>
            <a href="/terms">Términos y Condiciones</a>
          </div>
          <div className="ec-footer-section">
            <h4>Contacto</h4>
            <div className="ec-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src={githubIcon} alt="GitHub" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src={youtubeIcon} alt="YouTube" />
              </a>
            </div>
          </div>
        </div>
        <p>&copy; 2024 EduConnectG3</p>
      </footer>
    </div>
  );
}

export default ECLogin;
