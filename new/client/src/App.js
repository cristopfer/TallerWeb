import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ECLogin from './pages/ECLogin';
import ECHome from './pages/ECHome';
import ECProfesor from './pages/ECProfesor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<ECHome />} />
          
          {/* Ruta para la página de login */}
          <Route path="/login" element={<ECLogin />} />
          <Route path="/profesor" element={<ECProfesor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
