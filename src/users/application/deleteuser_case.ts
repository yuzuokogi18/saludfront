import { IUserRepository } from "../domain/IUserRepository";

export class DeleteUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
