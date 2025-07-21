import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import type {
  SalesStatsClients,
  SalesStats,
  CreateSaleData,
  SaleResponse,
  SaleWithClient,
} from "@/interfaces";

const fetchSalesStatsClients = async (): Promise<SalesStatsClients> => {
  const token = localStorage.getItem("token");
  const response = await api.get("/sales/stats/clients", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const fetchSalesStats = async (): Promise<SalesStats> => {
  const token = localStorage.getItem("token");
  const response = await api.get("/sales/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createSale = async (data: CreateSaleData): Promise<SaleResponse> => {
  const token = localStorage.getItem("token");
  const response = await api.post("/sales", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const fetchSales = async (): Promise<SaleWithClient[]> => {
  const token = localStorage.getItem("token");
  const response = await api.get("/sales", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useSalesStatsClients = () => {
  return useQuery({
    queryKey: ["sales-stats-clients"],
    queryFn: fetchSalesStatsClients,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });
};

export const useSalesStats = () => {
  return useQuery({
    queryKey: ["sales-stats"],
    queryFn: fetchSalesStats,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      // Invalida o cache de vendas e estatísticas para refazer a busca
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["sales-stats"] });
      queryClient.invalidateQueries({ queryKey: ["sales-stats-clients"] });
    },
  });
};

export const useSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });
};
