import React, { useState }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/ECCurso.css'; 
import logo from '../assets/images/LogoSin 1.svg';

function Curso() {
  const [credentials, setCredentials] = useState({ tema: '', titulo: '', descripcion: '', nivel:'', hora:''});
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleActualizarProfesor = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/profesor/actualizarCurso', {curso: credentials.tema + '-' + credentials.titulo, descripcion: credentials.descripcion+'-'+credentials.nivel+'-'+credentials.hora}, {
        withCredentials: true, 
      });
      const { estado } = response.data;
      if (estado === 1) {
        alert("Curso guardado"); 
        setCredentials({ tema: '', titulo: '', descripcion: '', nivel: '', hora: '' });
      } else {
        alert("Error en guardar curso");
      }
    } catch (error) {
      console.error('Error en el sistema:', error);
    }
  };

  const handleProfesor = () => {
    window.location.href = '/profesor';
  };
  return (
    <div className="course-creation-page">
      {/* Barra lateral */}
      <aside className="sidebar">
        <a className="ec-logo" href="#">
            <div className="ec-logo-image">
              <img src={logo} alt="Logo EduConnect" />
            </div>
            <p className="ec-logo-text">EduConnect</p>
        </a>
        <nav>
            <ul>
                <li onClick={handleProfesor}>Dashboard</li>
                <li className="active">Crear Nuevo Curso</li>
                <li>Mis Cursos</li>
                <li>Salario</li>
                <li>Inbox</li>
            </ul>
        </nav>
        <footer>
            <h2 className="ec-logo-text">SETTINGS</h2>
            <button className="settings">Settings</button>
            <Link to="/">
                <button className="logout">Logout</button>
            </Link>
        </footer>
      </aside>

      <div className="course-form">
        <header className="form-header">
          <h2>Crear nuevo curso</h2>
          <input type="text" placeholder="Search your course here..." className="search-input" />
        </header>

        <div className="form-tabs">
          <button className="tab active">Basic Information</button>
        </div>

        <div className="form-content">
          <h3>Basic Information</h3>
          <div className="progress-bar">
            <span className="progress-text">7/12</span>
          </div>

          <form>
            <label>Titulo del curso</label>
            <input name="titulo" value={credentials.titulo} type="text" placeholder="Your course title" maxLength="80" onChange={handleInputChange} />

            <label>Tema</label>
            <input name="tema" value={credentials.tema} type="text" placeholder="Your course subtitle" maxLength="120" onChange={handleInputChange} />

            <label>Course Topic</label>
            <input name="descripcion" value={credentials.descripcion} type="text" placeholder="What is primarily taught in your course?" onChange={handleInputChange} />
            <div className="input-row">
              <div>
                <label>Course Level</label>
                <select name="nivel" value={credentials.nivel} onChange={handleInputChange}>
                  <option>Select...</option>
                  <option value="Basico">Basico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
              <div>
                <label>Duration</label>
                <select name="hora" value={credentials.hora} onChange={handleInputChange}>
                  <option>Course duration</option>
                  <option value="1 hora">1 hora</option>
                  <option value="2 horas">2 horas</option>
                </select>
              </div>
            </div>

            <div className="form-buttons">
              <button type="button" className="cancel-button">Cancel</button>
              <button onClick={handleActualizarProfesor} type="button" className="save-button">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Curso;