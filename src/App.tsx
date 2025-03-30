import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/home';
import CreatePa from './pages/createpa'; // Importa la página del formulario
import './styles/home.css';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crear-expediente" element={<CreatePa />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
