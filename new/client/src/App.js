import React from 'react';
<<<<<<< HEAD
import ECLogin from './pages/ECLogin';

function App() {
  return (
    <div className="App">
      <ECLogin />
    </div>
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ECLogin from './pages/ECLogin';
import ECHome from './pages/ECHome';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<ECHome />} />
          
          {/* Ruta para la página de login */}
          <Route path="/login" element={<ECLogin />} />
        </Routes>
      </div>
    </Router>
>>>>>>> eysenDev
  );
}

export default App;
