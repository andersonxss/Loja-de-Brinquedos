export interface ClientData {
  id?: number | null;
  name: string;
  email: string;
  dataNascimento: string;
}

export interface Client {
  data: Array<ClientData> | [];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetClientsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateClientData {
  name: string;
  email: string;
  dataNascimento: string;
}

export interface UpdateClientData {
  id?: number | null;
  name: string;
  email: string;
  dataNascimento: string;
}

export interface ClientResponse {
  id: number;
  name: string;
  email: string;
  dataNascimento: string;
}
