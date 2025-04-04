import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class SaveUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: Omit<User, "id">): Promise<User> {
    return this.userRepository.save(user);
  }
}
