import { useState } from "react";

const useModalSales = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModalCreate = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    modalOpen,
    openModalCreate,
    closeModal,
  };
};

export default useModalSales;
