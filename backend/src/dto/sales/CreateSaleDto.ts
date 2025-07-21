import { IsInt, Min, IsDateString } from "class-validator";

export class CreateSaleDto {
  @IsInt({ message: "ID do cliente deve ser um número inteiro" })
  clientId: number;

  @Min(0.01, { message: "Valor da venda deve ser maior que zero" })
  value: number;

  @IsDateString({}, { message: "Data da venda inválida" })
  saleDate: string;
}
