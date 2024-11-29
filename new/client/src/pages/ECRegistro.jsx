import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/ECRegistro.css'; 
import logo from '../assets/images/LogoSin 1.svg';
import celular from '../assets/images/celular.png';
import facebookIcon from '../assets/images/Vector (1).svg';
import githubIcon from '../assets/images/Vector (2).svg';
import youtubeIcon from '../assets/images/Vector.svg';

function ECRegistro() {
  const [credentials, setCredentials] = useState({ username: '', password: '', name: '---', lastname: '', mail: '', tipo: '1', codigo: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const handleRegistro = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/usuario/registrar', credentials, {
        withCredentials: true, 
      });
      const { estado } = response.data;
      if (estado === 1) {
        alert("Nombre de usuario repetido, por favor digite otro nombre de usuario"); 
      } else {
        alert("Usted se acaba de registrar en el sistema");
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className="registro-container">
      <header className="header">
        <div className="ec-logo-title">
            <a className="ec-logo" href="#">
                <div className="ec-logo-image">
                    <img src={logo} alt="Logo EduConnect" />
                </div>
                <p className="ec-logo-text">EduConnect</p>
            </a>
        </div>
        <nav className="nav-bar">
          <a href="#profesores">Profesores</a>
          <a href="#cursos">Cursos</a>
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="image-section">
            <img src={celular} alt="celular" />
        </div>

        <div className="form-section">
          <h2>Regístrate y empieza a aprender.</h2><br/>

          <div className="registration-form">
            <div className="input-group">
              <input name="username" value={credentials.username} type="text" placeholder="Nombre" required onChange={handleInputChange} />
              <input name="lastname" value={credentials.lastname} type="text" placeholder="Apellido" required onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <input name="mail" value={credentials.mail} type="email" placeholder="Email" required onChange={handleInputChange} />
              <input name="codigo" value={credentials.codigo} type="text" placeholder="Codigo" required onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <input name="password" value={credentials.password} type="password" placeholder="Contraseña" required onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Confirmar Contraseña" required />
            </div>
            <div className="checkbox-group">
                <label>
                    <input type="checkbox" name="tipo" value="1" checked={credentials.tipo === '1'} onChange={handleInputChange}/>
                    Alumno
                    <input type="checkbox" name="tipo" value="2" checked={credentials.tipo === '2'} onChange={handleInputChange}/>
                    Profesor
                </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" />
                Acepto nuestros <a href="#terms">Términos</a> y nuestra <a href="#privacy">Política de Privacidad</a>
              </label>
            </div>

            <button onClick={handleRegistro} className="register-button">Regístrate</button>
            <p className="login-link">¿Ya tienes una cuenta? <a href="#login">Iniciar Sesión</a></p>
          </div>
        </div>
      </main>

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
      </footer>
      <div className="footer-bottom">
        <p>© 2024 EduConnect63</p>
      </div>
    </div>
  );
}

export default ECRegistro;