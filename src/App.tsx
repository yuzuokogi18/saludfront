import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/home';
import CreatePa from './pages/createpa';
import Expedient from './components/expedient';
import HistorialPage from './pages/historial';
import DetallePacientePage from './pages/detallepatient';
import Login from './pages/login';
import RegistrarsePage from './pages/registrarse'; 
import './styles/home.css';

// Verifica si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken') || !!localStorage.getItem('myUserName');
};

export const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());

  // Effect to check authentication on initial load
  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  // Effect to listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(isAuthenticated());
    };

    // This event only works across different tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // For changes in the same window, we'll need to check periodically
    const interval = setInterval(() => {
      const currentAuth = isAuthenticated();
      if (currentAuth !== authenticated) {
        setAuthenticated(currentAuth);
      }
    }, 1000); // Check every second

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [authenticated]);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route 
          path="/login" 
          element={
            authenticated ? 
              <Navigate to="/" replace /> : 
              <Login onLoginSuccess={() => setAuthenticated(true)} />
          } 
        />
        <Route 
          path="/register" 
          element={
            authenticated ? 
              <Navigate to="/" replace /> : 
              <RegistrarsePage />
          } 
        />
        
        {/* Rutas protegidas */}
        <Route 
          path="/" 
          element={
            authenticated ? 
              <Dashboard /> : 
              <Navigate to="/login" replace state={{ from: '/' }} />
          } 
        />
        <Route 
          path="/crear-expediente" 
          element={
            authenticated ? 
              <CreatePa /> : 
              <Navigate to="/login" replace state={{ from: '/crear-expediente' }} />
          } 
        />
        <Route 
          path="/expediente" 
          element={
            authenticated ? 
              <Expedient /> : 
              <Navigate to="/login" replace state={{ from: '/expediente' }} />
          } 
        />
        <Route 
          path="/historial" 
          element={
            authenticated ? 
              <HistorialPage /> : 
              <Navigate to="/login" replace state={{ from: '/historial' }} />
          } 
        />
        <Route 
          path="/historial/:id" 
          element={
            authenticated ? 
              <DetallePacientePage /> : 
              <Navigate to="/login" replace state={{ from: '/historial/:id' }} />
          } 
        />
        
        {/* Ruta de redirección por defecto */}
        <Route path="*" element={<Navigate to={authenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;