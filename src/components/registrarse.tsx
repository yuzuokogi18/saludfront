import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { User } from "../users/domain/User";
import "../styles/register.css";

interface RegisterFormProps {
  onRegister: (user: Omit<User, "id">) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const navigate = useNavigate(); // Hook para redireccionar
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    onRegister({ name, username, password, rol, email });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="login-image">
          <img src="/assets/register.png" alt="Login Illustration" />
        </div>
        <div className="register-form">
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <label>Rol</label>
            <input type="text" value={rol} onChange={(e) => setRol(e.target.value)} required />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <button type="submit">REGISTRARSE</button>
            <button type="button" className="back-button" onClick={() => navigate("/login")}>
              REGRESAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
