import { IUserLogin, IUserRepository } from "../../interfaces/IUser";
import UserRepository from "../../repositories/user/userRepository";
import jwt from "jsonwebtoken";
import AppError from "../../middlewares/AppError";

class AuthUserServices {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  public async execute(data: IUserLogin): Promise<any> {
    const { email, password } = data;
    const user = await this.userRepository.findUserByEmail(email);
    if (
      !user ||
      !(await this.userRepository.validatePassword(user, password))
    ) {
      throw new AppError("Credenciais inválidas", 401);
    }
    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.nome },
      secret,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }
}

export default AuthUserServices;
