import React from "react";
import DataTables from "./components/dataTables";
import DialogFormSales from "./components/dialogFormSales";
import useModalSales from "./hooks/useModalSales";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sales: React.FC = () => {
  const modalSales = useModalSales();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Vendas</h2>
        <Button
          className="flex items-center gap-2"
          onClick={modalSales.openModalCreate}
        >
          <Plus className="h-4 w-4" />
          Nova Venda
        </Button>
      </div>
      <DataTables />

      {modalSales.modalOpen && (
        <DialogFormSales
          modalOpen={modalSales.modalOpen}
          closeModal={modalSales.closeModal}
        />
      )}
    </div>
  );
};

export default Sales;
