import React from 'react';
import icono5 from '../assets/images/5.png';
import icono3 from '../assets/images/3.png';
import Sidebar from '../components/Sidebar';
import '../assets/styles/ECSetProfesor.css';
  
const Header = () => (
  <header className="headerSet">
    <span>Configuracion</span>
    <input type="text" placeholder="Busca un curso aqui" />
    <div>
      <img className="userIcon" src={icono3} />
      <img className="userIcon" src={icono5} />
    </div>
  </header>
);

const EditProfesor = () => (
  <div className="account-settings">
    <h2>Configurar cuenta</h2>
    <form>
      Nombres<input name="nombre" placeholder="Nombre" />
      Apellidos<input name="apellidos" placeholder="Apellidos" />
      Nombre de usuario<input name="usuario" placeholder="Nombre de usuario" />
      Numero de telefono<input name="telefono" placeholder="Número de teléfono" />
      Titulo<input name="titulo" placeholder="Título" maxLength="50" />
      Biografia<textarea name="biografia" placeholder="Biografía"></textarea>
      <div className='jorgeIpanaque'>
        <button type="submit">Guardar Cambios</button>
      </div>
    </form>
  </div>
);

const NotificationsSettings = () => (
  <div className="notifications-settings">
    <h3>Notificaciones</h3>
    <form>
      <label>
        <input type="checkbox" name="compraronCurso" />
        Quiero saber quién compró mi curso.
      </label>
      <label>
        <input type="checkbox" name="reseñaCurso" />
        Quiero saber quién reseñó mi curso.
      </label>
      <label>
        <input type="checkbox" name="comentarioLectura" />
        Quiero saber quién comentó mi lectura.
      </label>
      <label>
        <input type="checkbox" name="respuestaComentario" />
        Quiero saber quién respondió mi comentario.
      </label>
      <label>
        <input type="checkbox" name="visitaPerfil" />
        Quiero saber diariamente quién visitó mi perfil.
      </label>
      <label>
        <input type="checkbox" name="descargaMuro" />
        Quiero saber quién descargó una lectura en mi muro.
      </label>
      <div className='jorgeIpanaque'>
        <button type="button">Guardar Cambios</button>
      </div>
    </form>
  </div>
);

const PasswordChange = () => (
  <div className="password-change">
    <h3>Cambiar contraseña</h3>
    <form>
      <input type="password" name="currentPassword" placeholder="Contraseña actual" />
      <input type="password" name="newPassword" placeholder="Nueva contraseña" />
      <input type="password" name="confirmPassword" placeholder="Confirmar nueva contraseña" />
      <div className='jorgeIpanaque'>
        <button type="submit">Guardar Cambios</button>
      </div>
    </form>
  </div>
);

const SetProfesor = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div>
          <Header />
        </div>
        <div className="settings-wrapper">
          <EditProfesor />
          <div className="right-section">
            <NotificationsSettings />
            <PasswordChange />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetProfesor;