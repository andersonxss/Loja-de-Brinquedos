import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import useSetClients from "../hooks/useSetClients";
import { useMemo } from "react";
import type { ClientData } from "@/interfaces";

const DialogFormClients = ({
  modalOpen,
  closeModal,
  modalMode,
  clientState,
}: {
  modalOpen: boolean;
  closeModal: () => void;
  modalMode: string;
  clientState: ClientData;
}) => {
  const defaultValues = useMemo(() => {
    return {
      id: clientState?.id || null,
      name: clientState?.name || "",
      email: clientState?.email || "",
      dataNascimento: clientState?.dataNascimento || "",
      mode: modalMode || "",
    };
  }, [clientState, modalMode]);
  const { form, onSubmit } = useSetClients(
    defaultValues as ClientData,
    closeModal
  );
  const { isSubmitting } = form?.formState || {};
  const closeModalForm = () => {
    closeModal();
    form.reset();
  };

  return (
    <Dialog open={modalOpen} onOpenChange={closeModalForm}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {modalMode === "create"
              ? "Cadastrar Novo Cliente"
              : "Editar Cliente"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              type="text"
              label="Nome"
              placeholder="Nome completo"
              {...form.register("name")}
              validate={!!form.formState.errors.name}
              message={form.formState.errors.name?.message}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              label="E-mail"
              placeholder="email@exemplo.com"
              {...form.register("email")}
              validate={!!form.formState.errors.email}
              message={form.formState.errors.email?.message}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="birthDate"
              type="date"
              label="Data de Nascimento"
              {...form.register("dataNascimento")}
              validate={!!form.formState.errors.dataNascimento}
              message={form.formState.errors.dataNascimento?.message}
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
              {isSubmitting
                ? "Salvando..."
                : modalMode === "create"
                ? "Cadastrar"
                : "Editar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormClients;
