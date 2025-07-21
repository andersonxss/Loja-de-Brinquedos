export function formatCurrency(value: number | string): string {
  const num = typeof value === "number" ? value : Number(value);
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
