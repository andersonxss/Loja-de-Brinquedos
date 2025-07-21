import { Sale } from "../entities/Sale";

export interface ISalesCreate {
  clientId: number;
  value: number;
  saleDate: string;
}

export interface SalesByDay {
  date: string;
  total: number;
  count: number;
}

export interface ClientSalesStats {
  clientId: number;
  clientName: string;
  clientEmail: string;
  totalSales: number;
  totalValue: number;
  averageValue: number;
  uniqueDays?: number;
}

export interface ISalesRepository {
  create(data: ISalesCreate): Promise<Sale>;
  findAll(): Promise<Sale[]>;
  getTotalSalesByDay(): Promise<SalesByDay[]>;
  getClientWithHighestSales(): Promise<ClientSalesStats | null>;
  getClientWithHighestAverage(): Promise<ClientSalesStats | null>;
  getClientWithMostUniqueDays(): Promise<ClientSalesStats | null>;
}
