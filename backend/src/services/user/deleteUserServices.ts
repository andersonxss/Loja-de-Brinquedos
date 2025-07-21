import { IUserRepository } from "../../interfaces/IUser";
import UserRepository from "../../repositories/user/userRepository";
import AppError from "../../middlewares/AppError";

class DeleteUserServices {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findUserById(Number(id));
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    await this.userRepository.remove(Number(id));
  }
}

export default DeleteUserServices;
