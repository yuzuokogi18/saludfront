import RegisterForm from "../components/registrarse";
import { SaveUserCase } from "../users/application/saveuser_case";
import { UserRepository } from "../users/infrastructure/userRepository";
import { User } from "../users/domain/User";

const RegistrarsePage = () => {
  const userRepository = new UserRepository();
  const saveUserCase = new SaveUserCase(userRepository);

  const handleRegister = async (user: Omit<User, "id">) => {
    console.log("Enviando usuario:", user); 
    try {
      const newUser = await saveUserCase.execute(user);
      console.log("Usuario registrado:", newUser);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error en el registro");
    }
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default RegistrarsePage;
