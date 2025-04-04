import { IUserRepository } from "../domain/IUserRepository";
import { User, UserLogIn } from "../domain/User";

export class LoginCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(credentials: UserLogIn): Promise<User> {
    return this.userRepository.logIn(credentials);
  }
}
