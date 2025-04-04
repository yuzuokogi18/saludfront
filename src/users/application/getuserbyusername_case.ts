import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class GetUserByUsernameCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(username: string): Promise<User | null> {
    return this.userRepository.getByUsername(username);
  }
}
