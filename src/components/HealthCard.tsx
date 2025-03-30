import React from "react";

type HealthCardProps = {
  title: string;
  value: string;
  status: "optimo" | "alerta" | "critico";
  description: string;
};

export const HealthCard: React.FC<HealthCardProps> = ({ title, value, status, description }) => {
  return (
    <div className={`health-card ${status}`}>
      <h3>{title}</h3>
      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  );
};
