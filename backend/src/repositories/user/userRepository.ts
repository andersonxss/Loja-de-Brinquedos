import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { IUserCreate, IUserUpdate } from "../../interfaces/IUser";

class UserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async create(data: IUserCreate): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  public async update(data: IUserUpdate): Promise<User> {
    return await this.userRepository.save(data);
  }

  public async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  public async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async findAll() {
    return await this.userRepository.find({
      select: ["id", "nome", "email"],
    });
  }

  public async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async validatePassword(user: User, password: string) {
    return await bcrypt.compare(password, user.password);
  }
}

export default UserRepository;
