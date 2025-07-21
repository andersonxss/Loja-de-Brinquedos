import { IUserUpdate, IUserRepository } from "../../interfaces/IUser";
import { User } from "../../entities/User";
import UserRepository from "../../repositories/user/userRepository";
import AppError from "../../middlewares/AppError";
import bcrypt from "bcryptjs";

class UpdateUserServices {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(data: IUserUpdate, id: string): Promise<User> {
    const user = await this.userRepository.findUserById(Number(id));
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    if (data.email && data.email !== user.email) {
      const existing = await this.userRepository.findUserByEmail(data.email!);
      if (existing) {
        throw new AppError("Email já cadastrado", 400);
      }
    }
    if (data.nome) {
      user.nome = data.nome;
    }
    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, 10);
      user.password = passwordHash;
    }
    if (data.email) {
      user.email = data.email;
    }
    return await this.userRepository.update(user);
  }
}

export default UpdateUserServices;
