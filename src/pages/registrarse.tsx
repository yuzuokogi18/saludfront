import RegisterForm from "../components/registrarse";
import { SaveUserCase } from "../users/application/saveuser_case";
import { UserRepository } from "../users/infrastructure/userRepository";
import { User } from "../users/domain/User";

const RegistrarsePage = () => {
  const userRepository = new UserRepository();
  const saveUserCase = new SaveUserCase(userRepository);

  const handleRegister = async (user: Omit<User, "id">) => {
    try {
      await saveUserCase.execute(user); // ✅ usamos saveUserCase y user
      console.log("Usuario registrado con éxito");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default RegistrarsePage;
