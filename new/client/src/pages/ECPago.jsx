import React from 'react';
import '../assets/styles/ECPago.css';
import user from '../assets/images/user.png';
import logo from '../assets/images/LogoSin 1.svg';

function Pago() {
  return (
    <div className="payment-page">
      {/* Menú de navegación */}
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
            <li>Cerrar Sesión</li>
          </ul>
        </nav>
      </aside>

      {/* Formulario de pago */}
      <div className="payment-form">
        <h2>Pago</h2>
        <div className="input-group">
          <input type="text" placeholder="N° de tarjeta" required />
        </div>
        <div className="input-group">
          <input type="text" placeholder="mm/aa" required />
          <input type="text" placeholder="CCV" required />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Nombre" required />
          <input type="text" placeholder="Apellido" required />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Correo electrónico" required />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Sin cuotas" required />
        </div>
        <div className="input-group checkbox">
          <input type="checkbox" id="remember-card" />
          <label htmlFor="remember-card">Recordar tarjeta</label>
        </div>
        <button className="pay-button">Pagar</button>
      </div>
    </div>
  );
}

export default Pago;