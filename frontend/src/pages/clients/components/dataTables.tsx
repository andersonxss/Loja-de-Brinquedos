import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFirstMissingLetter } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import {
  useClientsPaginated,
  useDeleteClient,
} from "@/services/clients.service";
import type { ClientData } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search } from "lucide-react";
import { AlertConfirm } from "@/components";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AxiosError } from "axios";
import { notifications } from "@/lib/notification";

const DataTables = ({
  modalOpen,
}: {
  modalOpen: (client: ClientData) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const {
    data: clients,
    isLoading,
    error,
    isError,
  } = useClientsPaginated({
    page,
    limit,
    search,
  });

  if (isError) {
    if (error instanceof AxiosError) {
      notifications(error.response?.data);
    }
  }

  const deleteClient = useDeleteClient();

  const handleSearch = (search: string) => {
    setPage(1);
    setLimit(10);
    setSearch(search);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <>
          {clients?.data?.length === 0 && !isLoading && (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">
                Nenhum cliente encontrado
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {clients?.data?.length && clients.data.length > 0 && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableHead className="text-center">
                      Letra Faltante
                    </TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients?.data?.length &&
                    clients.data.map((client: ClientData) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          {client.name}
                        </TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>
                          {formatDate(client.dataNascimento)}
                        </TableCell>
                        <TableCell className="font-mono text-center">
                          {getFirstMissingLetter(client.name)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => modalOpen(client)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setOpen(true)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {open && (
                              <AlertConfirm
                                open={open}
                                setOpen={setOpen}
                                action={() =>
                                  deleteClient.mutate(client?.id || null, {
                                    onSuccess: () => {
                                      notifications({
                                        message: "Cliente deletado com sucesso",
                                        statusCode: 200,
                                      });
                                    },
                                    onError: (error) => {
                                      if (error instanceof AxiosError) {
                                        notifications(error.response?.data);
                                      }
                                    },
                                  })
                                }
                                title="Tem certeza que deseja deletar este cliente?"
                                description="Esta ação não pode ser desfeita."
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={page === 1 ? "opacity-50" : ""}
                      onClick={() => (page === 1 ? null : setPage(page - 1))}
                    />
                  </PaginationItem>
                  {clients?.totalPages &&
                    Array.from({ length: clients.totalPages }, (_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink onClick={() => setPage(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                  <PaginationItem>
                    <PaginationNext
                      className={
                        page === clients?.totalPages ? "opacity-50" : ""
                      }
                      onClick={() =>
                        page === clients?.totalPages ? null : setPage(page + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default DataTables;
