import { IsEmail, IsOptional, IsDateString } from "class-validator";

export class UpdateClientDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "E-mail inválido" })
  email?: string;

  @IsOptional()
  @IsDateString({}, { message: "Data de nascimento inválida" })
  dataNascimento?: string;
}
