import type { ClientData } from "./clients.interface";

export interface ClientStats {
  clientId: number;
  clientName: string;
  clientEmail: string;
  totalSales: number;
  totalValue: number;
  averageValue: number;
}

export interface ClientWithUniqueDays extends ClientStats {
  uniqueDays: number;
}

export interface SalesStatsClients {
  clientWithHighestSales: ClientStats;
  clientWithHighestAverage: ClientStats;
  clientWithMostUniqueDays: ClientWithUniqueDays;
}

export interface SalesByDay {
  date: string;
  total: number;
  count: number;
}

export interface SalesStats {
  salesByDay: SalesByDay[];
}

export interface CreateSaleData {
  clientId: number | string;
  value: number | null;
  saleDate: string;
}

export interface SaleResponse {
  value: number;
  saleDate: string;
  clientId: number;
  id: number;
}

export interface SaleWithClient {
  id: number;
  value: number;
  saleDate: string;
  clientId: number;
  client: ClientData;
}
