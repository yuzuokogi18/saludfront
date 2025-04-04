import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class UpdateUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number, updates: Partial<Omit<User, "id">>): Promise<User> {
    return this.userRepository.update(id, updates);
  }
}
