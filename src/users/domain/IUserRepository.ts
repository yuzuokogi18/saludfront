import {UserLogIn, User} from "./User";

export interface IUserRepository {
  save(user: Omit<User, "id">): Promise<User>;                            // Crear usuario (excepto Super Admin)
  logIn(credentials: UserLogIn): Promise<User>;                          // Inicio de sesión
  update(id: number, updates: Partial<Omit<User, "id">>): Promise<User>; // Actualizar usuario
  delete(id: number): Promise<void>;                                     // Eliminar usuario
  getAll(): Promise<User[]>;                                             // Obtener todos los usuarios
  getById(id: number): Promise<User | null>;                             // Buscar usuario por ID
  getByUsername(username: string): Promise<User | null>;                 // Buscar usuario por username
  getAdmin(): Promise<User>;                                             // Obtener Super Admin
}
