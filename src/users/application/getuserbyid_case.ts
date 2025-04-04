import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class GetUserByIdCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepository.getById(id);
  }
}
