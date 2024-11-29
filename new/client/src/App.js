import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ECLogin from './pages/ECLogin';
import ECHome from './pages/ECHome';
import ECProfesor from './pages/ECProfesor';
import ECRegistro from './pages/ECRegistro';
import ECBuscador from './pages/ECBuscador';
import ECPago from './pages/ECPago';
import ECCurso from './pages/ECCurso';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ECHome />} />
          <Route path="/login" element={<ECLogin />} />
          <Route path="/profesor" element={<ECProfesor />} />
          <Route path="/registro" element={<ECRegistro />} />
          <Route path="/buscador" element={<ECBuscador />} />
          <Route path="/pago" element={<ECPago />} />
          <Route path="/curso" element={<ECCurso />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
