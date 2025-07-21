import React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  CartesianGrid,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { useSalesStats } from "@/services/sales.service";
import { AxiosError } from "axios";
import { notifications } from "@/lib/notification";
import ChartSkeleton from "./ChartSkeleton";

const Charts: React.FC = () => {
  const { data, isLoading, error, isError } = useSalesStats();

  if (isError) {
    if (error instanceof AxiosError) {
      notifications(error.response?.data);
    }
  }

  if (isLoading) {
    return <ChartSkeleton />;
  }

  // Transformar os dados para o formato esperado pelo gráfico
  const chartData =
    data?.salesByDay?.map((item) => ({
      date: new Date(item.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      total: item.total,
      count: item.count,
    })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "total"
                    ? value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : value.toLocaleString(),
                  name === "total" ? "Valor Total" : "Quantidade",
                ]}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Bar
                dataKey="total"
                name="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Charts;
