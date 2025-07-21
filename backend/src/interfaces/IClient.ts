import { Client } from "../entities/Client";

export interface IClientCreate {
  name: string;
  email: string;
  dataNascimento: Date;
}

export interface IClientUpdate {
  id?: number;
  name?: string;
  email?: string;
  dataNascimento?: Date;
}

export interface PaginationOptions {
  page?: number | undefined;
  limit?: number | undefined;
  search?: string;
}

export interface PaginatedResult {
  data: Array<IClientUpdate>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IClientRepository {
  create(data: IClientCreate): Promise<Client>;
  update(data: IClientUpdate): Promise<Client>;
  delete(id: number): Promise<void>;
  findClientByEmail(email: string): Promise<Client | null>;
  findClientById(id: number): Promise<Client | null>;
  findAllPaginated(
    filters?: PaginationOptions
  ): Promise<PaginatedResult | null>;
  findAll(): Promise<Client[]>;
}
