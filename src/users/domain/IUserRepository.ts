import {UserLogIn, User} from "./User";

export interface IUserRepository {
  save(user: Omit<User, "id">): Promise<User>;                            
  logIn(credentials: UserLogIn): Promise<User>;                          
  update(id: number, updates: Partial<Omit<User, "id">>): Promise<User>; 
  delete(id: number): Promise<void>;                                   
  getAll(): Promise<User[]>;                                            
  getById(id: number): Promise<User | null>;                            
  getByUsername(username: string): Promise<User | null>;               
  getAdmin(): Promise<User>;                                             
}
