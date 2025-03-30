import React from "react";
import Expedient from "../components/expedient";
import "../styles/home.css"; // Importa el archivo CSS para estilos

const Expedien: React.FC = () => {
  return (
    <div className="expedien-page">
      <Expedient />
    </div>
  );
};

export default Expedien;
