import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class GetUsersCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
