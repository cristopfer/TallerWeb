import React, { useState } from 'react';
import axios from 'axios';
import Registroimagen from '../assets/images/Registroimagen.svg';
import logo from '../assets/images/LogoSin 1.svg';
import facebookIcon from '../assets/images/Vector (1).svg';
import githubIcon from '../assets/images/Vector (2).svg';
import youtubeIcon from '../assets/images/Vector.svg';
import '../assets/styles/ECLogin.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    termsAccepted: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Maneja el cambio de los campos de entrada del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // Verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setSuccessMessage('');
      return;
    }

    // Llamar a la función de registro
    await handleRegister();
  };

  // Función para enviar los datos del formulario al servidor
  const handleRegister = async () => {
    try {
      // Enviar una solicitud POST al servidor con los datos del formulario
      const response = await axios.post('/register', formData);

      // Manejo de respuesta según el estado del registro
      if (response.data.success) {
        setSuccessMessage('Registro exitoso. ¡Bienvenido!');
        setError('');

        // Limpiar el formulario después del registro exitoso
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: '',
          termsAccepted: false,
        });
      } else {
        // Mostrar mensaje de error si la respuesta indica un problema
        setError(response.data.message || 'Hubo un problema en el registro.');
        setSuccessMessage('');
      }
    } catch (error) {
      // Mostrar mensaje de error en caso de fallo de conexión o problema del servidor
      console.error('Error en el registro:', error);
      setError('Hubo un problema al conectar con el servidor.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="ec-registration-container">
      <header className="ec-header">
        <div className="ec-logo-title">
          <a className="ec-logo" href="/">
            <div className="ec-logo-image">
              <img src={logo} alt="Logo EduConnect" />
            </div>
            <p className="ec-logo-text">EduConnect</p>
          </a>
        </div>
        <p className="ec-homep-text">Profesores</p>
        <p className="ec-homec-text">Cursos</p>
        <nav className="ec-nav">
          <a href="/login" className="ec-iniciarsesion-link">Iniciar Sesión</a>
        </nav>
      </header>

      <section className="registration-section">
        <div className="registration-panel">
          <div className="form-image">
            <img src={Registroimagen} alt="Imagen Form" />
          </div>
          <div className="registration-panel-body">
            <form className="registration-panel-heading" onSubmit={handleSubmit}>
              <h2>Regístrate</h2>
              <p>Regístrate y empieza a aprender.</p>
              <div className="ec-panel-body">
                {error && <div className="ec-error-message">{error}</div>}
                <div className="ec-panel-body-a">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombres"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellidos"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="ec-panel-body-b">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Número de teléfono"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="ec-panel-body-c">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
                <div className="role-selection">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="alumno"
                      onChange={handleInputChange}
                      checked={formData.role === 'alumno'}
                    />
                    Alumno
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="profesor"
                      onChange={handleInputChange}
                      checked={formData.role === 'profesor'}
                    />
                    Profesor
                  </label>
                </div>

                <label className="terms">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                  />
                  Acepto nuestras <a href="#terms" className="ec-terminos-link">Términos</a> y nuestra <a href="#privacy" className="ec-privacy-link">Política de Privacidad</a>
                </label>
                <button type="submit" className="register-button">
                  Regístrate
                </button>
                <p className="login-link">
                  ¿Ya tienes una cuenta?
                  <a href="/login" className="ec-login-link">
                    Iniciar Sesión
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section >

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
        <div className="footer-bottom">
          <p>&copy; 2024 EduConnect</p>
        </div>
      </footer>
    </div >
  );
}

export default RegistrationForm;
