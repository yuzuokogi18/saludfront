import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import { User } from "../users/domain/User";
import "../styles/register.css";

interface RegisterFormProps {
  onRegister: (user: Omit<User, "id">) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    onRegister({ name, username, password, rol, email });

    await Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: "Tu cuenta ha sido creada correctamente.",
      confirmButtonText: "Ir al login",
    });

    navigate("/login");
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
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Rol</label>
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  required
                >
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Administrador</option>
                  <option value="medico">Médico</option>
                  
                </select>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit">REGISTRARSE</button>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/login")}
            >
              REGRESAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
