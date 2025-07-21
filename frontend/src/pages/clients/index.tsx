import React from "react";
import DataTables from "./components/dataTables";
import DialogFormClients from "./components/dialogFormClients";
import useModalCients from "./hooks/useModalCients";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClientData } from "@/interfaces";

const Clients: React.FC = () => {
  const modalClients = useModalCients();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <Button
          className="flex items-center gap-2"
          onClick={modalClients.openModalCreate}
        >
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
      <DataTables modalOpen={modalClients.openModalEdit} />

      {modalClients.modalOpen && (
        <DialogFormClients
          modalOpen={modalClients.modalOpen}
          closeModal={modalClients.closeModal}
          modalMode={modalClients.modalMode}
          clientState={modalClients.clientState as ClientData}
        />
      )}
    </div>
  );
};

export default Clients;
