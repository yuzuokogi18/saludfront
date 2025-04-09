import LoginForm from "../components/login";
import { LoginCase } from "../users/application/login_case";
import { UserRepository } from "../users/infrastructure/userRepository";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const userRepository = new UserRepository();
  const loginCase = new LoginCase(userRepository);
  const navigate = useNavigate();
  const [myUser, setMyUser] = useState<any | null>(null);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      const user: any = await loginCase.execute(credentials);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      localStorage.setItem("authToken", user.name);
      localStorage.setItem("myUserName", user.name);

      setMyUser(user);
      onLoginSuccess(); // Notify parent component about successful login
    } catch (error) {
      console.error("Error en login:", error);
      alert("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  useEffect(() => {
    if (myUser) {
      navigate("/home");
    }
  }, [myUser, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;