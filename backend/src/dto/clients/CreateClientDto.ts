import { IsNotEmpty, IsEmail, IsDateString, IsOptional } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty({ message: "Nome é obrigatório" })
  name: string;

  @IsEmail({}, { message: "E-mail inválido" })
  email: string;

  @IsDateString({}, { message: "Data de nascimento inválida" })
  dataNascimento: string;
}
