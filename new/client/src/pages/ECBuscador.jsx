import React , { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/ECBuscador.css'; 
import excel from '../assets/images/excel.png';
import powerbi from '../assets/images/powerBI.png';
import user from '../assets/images/user.png';
import logo from '../assets/images/LogoSin 1.svg';

function Buscador() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estado, setEstado] = useState(null);
  const [consulta, setConsulta] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const toggleModal = (index) => {
    setSelectedSection(index);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/usuario/logueo', {
          withCredentials: true,
        });
        setEstado(response.data); 
      } catch (error) {
        console.error('Error de logueo:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/profesor/consultarCurso', {
          withCredentials: true,
        });
        setConsulta(response.data); 
      } catch (error) {
        console.error('Error de logueo:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = () => {
    window.location.href = '/';
  };


  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
            <img src={logo} alt="Logo EduConnect" />
            <p className="ec-logo-text">EduConnect</p>
        </div>
        <div className="user-info">
            <img src={user} alt="User" />
            <p>Rosmeri Ccanto</p>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Inicio</li>
            <li>Notificaciones</li>
            <li>Pago</li>
            <li>Configuración</li>
            <li onClick={handleChange}>Cerrar Sesión</li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <h1>Hola {estado ? estado.ape : 'Usuario'}</h1>
        <p>¿Qué aprenderemos hoy?</p>
        
        <div>
            <section className="course-grid">
                {[...Array(consulta ? consulta.length : 0)].map((_, index) => (
                    <div className="course-card" key={index}>
                        <img src={excel} alt="Excel" onClick={() => toggleModal(index)} />
                    </div>
                ))}
            </section>

            {isModalOpen && selectedSection !== null && (
                <div className="modal">
                    <div className="modal-content">
                        <h1>Excel</h1>
                        <div className="course-container1">
                            {/* Primera columna */}
                            <div className="course-info1">
                                <div>
                                    <strong>Profesor:</strong> <span className="professor-name">{(consulta ? consulta[selectedSection].nomusu+" "+consulta[selectedSection].ape : 'Cargando...')}</span>
                                </div><br />
                                <div>
                                    <strong>Descripción</strong><br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div><br />
                                <div>
                                    <strong>Calificación</strong> <span>⭐⭐⭐⭐⭐</span>
                                </div><br />
                                <div>
                                    <strong>Precio</strong> S/50.00
                                </div>
                             </div>

                            {/* Segunda columna */}
                            <div className="course-image1">
                                <img src={excel} alt="Imagen del curso Excel" />
                            </div>
                        </div> 
                        <p>
                            <button className="buy-button">Comprar curso</button>
                            <button className="close-button" onClick={toggleModal}>Cerrar</button>
                        </p>                      
                    </div>
                </div>
            )}
        </div>

        <section className="recommended-courses">
          <h2>Cursos recomendados para ti</h2>
          <div className="recommended-grid">
            {[...Array(6)].map((_, index) => (
              <div className="recommended-card" key={index}>
                    <img src={powerbi} alt="Power BI" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Buscador;