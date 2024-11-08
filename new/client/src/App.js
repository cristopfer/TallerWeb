import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ECLogin from './pages/ECLogin';
import ECHome from './pages/ECHome';
import ECProfesor from './pages/ECProfesor';
import ECSetProfesor from './pages/ECSetProfesor';

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

          <Route path="/setprofesor" element={<ECSetProfesor />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
