import CardsItens from "./cardsItens";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { useSalesStatsClients } from "@/services/sales.service";
import CardSkeleton from "./CardSkeleton";
import { notifications } from "@/lib/notification";
import { AxiosError } from "axios";

const Cards: React.FC = () => {
  const { data: stats, isLoading, error, isError } = useSalesStatsClients();

  if (isError) {
    if (error instanceof AxiosError) {
      notifications(error.response?.data);
    }
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardsItens
        title="Maior Volume de Vendas"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        value={stats?.clientWithHighestSales?.averageValue ?? 0}
        clientName={stats?.clientWithHighestSales?.clientName ?? ""}
      />
      <CardsItens
        title="Maior Média de valor por venda"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        value={stats?.clientWithHighestAverage?.averageValue ?? 0}
        clientName={stats?.clientWithHighestAverage?.clientName ?? ""}
      />
      <CardsItens
        title="Maior frequência de compras"
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
        value={stats?.clientWithMostUniqueDays?.averageValue ?? 0}
        clientName={stats?.clientWithMostUniqueDays?.clientName ?? ""}
      />
    </div>
  );
};

export default Cards;
