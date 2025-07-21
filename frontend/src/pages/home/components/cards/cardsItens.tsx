import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardsItensProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  clientName: string;
}

const CardsItens: React.FC<CardsItensProps> = ({
  title,
  icon,
  value,
  clientName,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }) || "N/A"}
        </div>
        <p className="text-xs text-muted-foreground">
          {clientName || "Nenhum cliente"}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardsItens;
