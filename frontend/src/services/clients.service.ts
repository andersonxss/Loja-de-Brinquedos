import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import type {
  Client,
  GetClientsParams,
  CreateClientData,
  UpdateClientData,
  ClientResponse,
} from "@/interfaces";

const fetchClientsPaginated = async (
  params?: GetClientsParams
): Promise<Client> => {
  const response = await api.get("/clients/paginated", {
    params,
  });
  return response.data;
};

const fetchClients = async (): Promise<Client> => {
  const response = await api.get("/clients");
  return response.data;
};

const createClient = async (
  data: CreateClientData
): Promise<ClientResponse> => {
  const token = localStorage.getItem("token");
  const response = await api.post("/clients", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateClient = async (
  data: UpdateClientData
): Promise<ClientResponse> => {
  const response = await api.put(`/clients/${data?.id}`, data);
  return response.data;
};

const deleteClient = async (id: number | null): Promise<void> => {
  await api.delete(`/clients/${id}`);
};

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async (): Promise<Client> => await fetchClients(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });
};

export const useClientsPaginated = (params?: GetClientsParams) => {
  return useQuery({
    queryKey: ["clientsPaginated", params],
    queryFn: async (): Promise<Client> => await fetchClientsPaginated(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      // Invalida o cache de clientes para refazer a busca
      queryClient.invalidateQueries({ queryKey: ["clientsPaginated"] });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      // Invalida o cache de clientes para refazer a busca
      queryClient.invalidateQueries({ queryKey: ["clientsPaginated"] });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      // Invalida o cache de clientes para refazer a busca
      queryClient.invalidateQueries({ queryKey: ["clientsPaginated"] });
    },
  });
};
