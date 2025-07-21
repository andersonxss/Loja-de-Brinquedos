import { IsEmail, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateUsersDto {
  @IsOptional()
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: "E-mail inválido" })
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: "Senha é obrigatória" })
  password?: string;
}
