import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { userApi } from "../infrastructure/userApi"; // Ruta corregida

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const response = await userApi.get("/");
    return response.data.map(
      (u: any) => new User(u.id, u.name, u.rol, u.email,u.password, u.username)
    );
  }

  async getById(id: number): Promise<User | null> {
    const response = await userApi.get(`/${id}`);
    return response.data
      ? new User(
          response.data.id,
          response.data.name,
          response.data.rol,
          response.data.email,
          response.data.password,
          response.data.username
        )
      : null;
  }

  async getByUsername(username: string): Promise<User | null> {
    const response = await userApi.get(`/username/${username}`);
    return response.data
      ? new User(
          response.data.id,
          response.data.name,
          response.data.rol,
          response.data.email,
          response.data.password,
          response.data.username
        )
      : null;
  }

  async getAdmin(): Promise<User> {
    const response = await userApi.get("/admin");
    return new User(
      response.data.id,
      response.data.name,
      response.data.rol,
      response.data.email,
        response.data.password, 
      response.data.username
    );
  }

  async save(userData: Omit<User, "id">): Promise<User> {
    const response = await userApi.post("/", userData);
    console.log("Respuesta de la API en saveUser:", response.data);
    return new User(
      response.data.id,
      response.data.name,
      response.data.rol,
      response.data.password, 
      response.data.email,
      
      response.data.username
    );
  }

  async logIn(credentials: { username: string; password: string }): Promise<User> {
    const response = await userApi.post("/login", credentials);
    const userData = response.data.user;
    const token = response.data.token;
  
    return new User(
      userData.id,
      userData.name,
      userData.rol,
      userData.email,
      userData.username,
      token
    );
  }
  

  async update(id: number, updates: Partial<Omit<User, "id">>): Promise<User> {
    const response = await userApi.put(`/${id}`, updates);
    return new User(
      response.data.id,
      response.data.name,
      response.data.rol,
      response.data.email,
      response.data.password, 
      response.data.username
    );
  }

  async delete(id: number): Promise<void> {
    await userApi.delete(`/${id}`);
  }
}
