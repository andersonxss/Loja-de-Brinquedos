import { User } from "../entities/User";

export interface IUserCreate {
  nome: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  id?: number;
  nome?: string;
  email?: string;
  password?: string;
}

export interface IUserRepository {
  create(data: IUserCreate): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(data: IUserUpdate): Promise<User>;
  remove(id: number): Promise<void>;
  validatePassword(user: User, password: string): Promise<boolean>;
}
