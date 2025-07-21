import { IUserCreate, IUserRepository } from "../../interfaces/IUser";
import { User } from "../../entities/User";
import UserRepository from "../../repositories/user/userRepository";
import bcrypt from "bcryptjs";
import AppError from "../../middlewares/AppError";

class CreateUserServices {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  public async execute(data: IUserCreate): Promise<User> {
    const { nome, email, password } = data;
    const existing = await this.userRepository.findUserByEmail(email);
    if (existing) {
      throw new AppError("Email já cadastrado");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      nome,
      email,
      password: passwordHash,
    });
    return user;
  }
}

export default CreateUserServices;
