import React from "react";
import { Link } from "react-router-dom";


export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
    <ul className="sidebar-menu">
      <div className="logo-container">
        <img src="/assets/logos.png" alt="Expediente" />
      </div>

      <Link to="/crear-expediente" className="menu-item">
        <li>
          <img src="/assets/crear.png" alt="Crear Expediente" />
          <span>CREAR PACIENTE</span>
        </li>
      </Link>

      <li>
        <img src="/assets/generar.png" alt="Generar Signos Vitales" />
        <span>GENERAR SIGNOS VITALES</span>
      </li>

      <Link to="/historial" className="menu-item">
        <li>
          <img src="/assets/historial.png" alt="Historial" />
          <span>HISTORIAL</span>
        </li>
      </Link>
    </ul>
  </div>
  
);
};
