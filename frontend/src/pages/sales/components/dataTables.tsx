import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { useSales } from "@/services/sales.service";
import type { SaleWithClient } from "@/interfaces";
import { formatCurrency } from "@/lib/formatCurrency";
import { notifications } from "@/lib/notification";
import { AxiosError } from "axios";

const DataTables = () => {
  const { data: sales, isLoading, isError, error } = useSales();

  if (isError) {
    if (error instanceof AxiosError) {
      notifications(error.response?.data);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <>
          {sales?.length === 0 && !isLoading && (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">
                Nenhuma venda encontrada
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {sales && sales.length > 0 && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data da Venda</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((venda: SaleWithClient) => (
                    <TableRow key={venda.id}>
                      <TableCell className="font-medium">
                        {venda.client.name}
                      </TableCell>
                      <TableCell>{formatCurrency(venda.value)}</TableCell>
                      <TableCell>{formatDate(venda.saleDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default DataTables;
