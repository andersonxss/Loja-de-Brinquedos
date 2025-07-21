import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateUsersDto {
  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome: string;

  @IsEmail({}, { message: "E-mail inválido" })
  email: string;

  @IsNotEmpty({ message: "Senha é obrigatória" })
  password: string;
}
