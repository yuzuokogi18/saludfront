import LoginForm from "../components/login";
import { LoginCase } from "../users/application/login_case";
import { UserRepository } from "../users/infrastructure/userRepository";

const Login = () => {
  const userRepository = new UserRepository();
  const loginCase = new LoginCase(userRepository);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      const user = await loginCase.execute(credentials);
      console.log("Usuario logueado:", user);
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
