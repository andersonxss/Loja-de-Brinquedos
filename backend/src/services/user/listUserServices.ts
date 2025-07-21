import { IUserRepository } from "../../interfaces/IUser";
import UserRepository from "../../repositories/user/userRepository";
import { User } from "../../entities/User";

class ListUserServices {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}

export default ListUserServices;
