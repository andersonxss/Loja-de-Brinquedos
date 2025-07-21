export const formatDate = (dateString: string) => {
  const localDate = new Date(dateString + "T00:00:00");
  return localDate.toLocaleDateString("pt-BR");
};
