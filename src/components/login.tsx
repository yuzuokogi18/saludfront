import { useState } from "react";
import { UserLogIn } from "../users/domain/User";
import "../styles/login.css";

interface LoginFormProps {
  onLogin: (credentials: UserLogIn) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    onLogin(new UserLogIn(username, password)); // Pasar las credenciales al padre
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img src="/assets/login.png" alt="Login Illustration" />
        </div>
        <div className="login-form">
          <h2>LOG IN</h2>
          <form onSubmit={handleSubmit}>
            <label>USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">INGRESAR</button>
          </form>
          <div className="register-link">
            Aún no tienes cuenta? <a href="/register">Regístrate!</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
