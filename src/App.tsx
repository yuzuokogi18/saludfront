import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Dashboard } from './pages/home';
import CreatePa from './pages/createpa';
import Expedient from './components/expedient';
import HistorialPage from './pages/historial';
import DetallePacientePage from './pages/detallepatient';
import Login from './pages/login';
import RegistrarsePage from './pages/registrarse'; // Importar la página de registro
import './styles/home.css';

// Verifica si el usuario está autenticado
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

const LoginRedirect: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/'); // Redirige a la página principal si el usuario ya está autenticado
    }
  }, [navigate]);

  return null; // No necesita renderizar nada
};

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
   
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated() ? <Navigate to="/" /> : <RegistrarsePage />} />
        
  
        <Route 
          path="/" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/crear-expediente" 
          element={isAuthenticated() ? <CreatePa /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/expediente" 
          element={isAuthenticated() ? <Expedient /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/historial" 
          element={isAuthenticated() ? <HistorialPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/historial/:id" 
          element={isAuthenticated() ? <DetallePacientePage /> : <Navigate to="/login" />} 
        />
          

  
        <Route path="*" element={<LoginRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
