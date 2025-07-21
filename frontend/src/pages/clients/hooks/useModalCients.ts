import type { ClientData } from "@/interfaces/clients.interface";
import { useState } from "react";

const useModalCients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [clientState, setClientState] = useState<ClientData | null>(null);

  const openModalCreate = () => {
    setModalOpen(true);
    setModalMode("create");
    setClientState(null);
  };

  const openModalEdit = (client: ClientData) => {
    setModalOpen(true);
    setModalMode("edit");
    setClientState(client);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("create");
    setClientState(null);
  };

  return {
    modalOpen,
    modalMode,
    clientState,
    openModalCreate,
    openModalEdit,
    closeModal,
  };
};

export default useModalCients;
