import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/ECProfesor.css'; 
import logo from '../assets/images/LogoSin 1.svg';
import icono1 from '../assets/images/1.png';
import icono2 from '../assets/images/2.png';
import icono3 from '../assets/images/3.png';
import icono4 from '../assets/images/4.png';
import icono5 from '../assets/images/5.png';
import icono6 from '../assets/images/6.png';
import icono7 from '../assets/images/7.png';
import icono8 from '../assets/images/8.png';
import grafico1 from '../assets/images/9.png';
import grafico2 from '../assets/images/10.png';
import grafico3 from '../assets/images/11.png';
import grafico4 from '../assets/images/12.png';

const estado ={};
const handleChange = () => {
  window.location.href = '/curso';
};

try {
  const response = await axios.post('http://localhost:8000/api/usuario/logueo', {
    withCredentials: true, 
  });
  estado = response.data;
} catch (error) {
  console.error('Error de logueo:', error);
}

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
            <li onClick={handleChange}>Crear Nuevo Curso</li>
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
);

const Header = () => (
  <header className="header">
    <input type="text" placeholder="Search your course here..." />
    <div className="user-icon">
      {/* Icono de usuario aquí */}
    </div>
  </header>
);

const StatsOverview = () => (
  <section className="stats-overview">
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono1} alt="icono1" className="stat-icon" />
        <div className="stat-text">
          <p>957</p>
          <span>Enrolled Courses</span>
        </div>        
      </div>
    </div>
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono2} alt="icono2" className="stat-icon" />
        <div className="stat-text">
          <p>19</p>
          <span>Active Courses</span>
        </div>        
      </div>
    </div>
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono3} alt="icono3" className="stat-icon" />
        <div className="stat-text">
          <p>241</p>
          <span>Course Instructors</span>
        </div>        
      </div>
    </div>
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono4} alt="icono4" className="stat-icon" />
        <div className="stat-text">
          <p>951</p>
          <span>Completed Courses</span>
        </div>        
      </div>
    </div>
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono5} alt="icono5" className="stat-icon" />
        <div className="stat-text">
          <p>1,674,767</p>
          <span>Students</span>
        </div>        
      </div>
    </div>
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono6} alt="icono6" className="stat-icon" />
        <div className="stat-text">
          <p>3</p>
          <span>Online Courses</span>
        </div>        
      </div>
    </div>
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono7} alt="icono7" className="stat-icon" />
        <div className="stat-text">
          <p>$7,461,767</p>
          <span>USD Total Earning</span>
        </div>        
      </div>
    </div>
    <div className="stat-box">
      <div className="stat-content">
        <img src={icono8} alt="icono8" className="stat-icon" />
        <div className="stat-text">
          <p>56,489</p>
          <span>Course Sold</span>
        </div>        
      </div>
    </div>
  </section>
);

const ChartsSection = () => (
  <section className="charts">
    <div className="chart">
        <img src={grafico1} alt="grafico1" />
    </div>

    <div className="chart">
        <img src={grafico2} alt="grafico2" />
    </div>

    <div className="chart">
        <img src={grafico3} alt="grafico3" />
    </div>

    <div className="chart">
        <img src={grafico4} alt="grafico4" />
    </div>
  </section>
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <Header />
        <StatsOverview />
        <ChartsSection />
      </main>
    </div>
  );
};

export default Dashboard;