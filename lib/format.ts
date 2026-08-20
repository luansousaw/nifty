export function cleanText(value: string) {
  return value.replace(/[<>\u0000-\u001F]/g, "").replace(/\s+/g, " ").trim();
}

export function normalizePrice(value: string) {
  const normalized = value.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".");
  const amount = Math.round(Number(normalized));
  if (!Number.isFinite(amount) || amount < 0) throw new Error("Valor inválido");
  return `R$ ${amount.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
}
