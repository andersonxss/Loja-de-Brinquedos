import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import useSetSales from "../hooks/useSetSales";
import { useClients } from "@/services/clients.service";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { InputCurrency } from "@/components/ui/input-currency";

const DialogFormSales = ({
  modalOpen,
  closeModal,
}: {
  modalOpen: boolean;
  closeModal: () => void;
}) => {
  const { form, onSubmit } = useSetSales(closeModal);
  const { isSubmitting } = form?.formState || {};
  const { data: clients, isLoading } = useClients();
  const closeModalForm = () => {
    closeModal();
    form.reset();
  };

  return (
    <Dialog open={modalOpen} onOpenChange={closeModalForm}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Venda</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Select de Clientes */}
          {isLoading ? (
            <div>Carregando...</div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="clientId" className="text-sm font-medium">
                Cliente
              </label>
              <Select
                value={form.watch("clientId")?.toString() || ""}
                onValueChange={(value) => form.setValue("clientId", value)}
                name="clientId"
                disabled={isSubmitting}
              >
                <SelectTrigger id="clientId" className="w-full">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients !== undefined &&
                  Array.isArray(clients) &&
                  clients.length > 0 ? (
                    clients.map((client) => {
                      if (!client) {
                        return null;
                      }
                      return (
                        <SelectItem
                          key={client.id}
                          value={client?.id?.toString()}
                        >
                          {client.name} ({client.email})
                        </SelectItem>
                      );
                    })
                  ) : (
                    <SelectItem value="" disabled>
                      Nenhum cliente encontrado
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {form.formState.errors.clientId && (
                <span className="text-destructive text-xs">
                  {form.formState.errors.clientId.message as string}
                </span>
              )}
            </div>
          )}
          {/* Restante do formulário */}
          <div className="space-y-2">
            <InputCurrency
              label="Valor"
              id="value"
              placeholder="Valor"
              value={form.watch("value") || 0}
              onChange={(val) => form.setValue("value", val)}
              validate={!!form.formState.errors.value}
              message={form.formState.errors.value?.message}
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Data da Venda"
              id="saleDate"
              type="date"
              placeholder="Data da Venda"
              {...form.register("saleDate")}
              validate={!!form.formState.errors.saleDate}
              message={form.formState.errors.saleDate?.message}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => closeModalForm()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormSales;
