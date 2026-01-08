import { Currency } from "@/types/goal";

export function convertCurrency(
  amount: number,
  from: Currency,
  rate: number
) {
  if (!rate) return 0;
  return from === "USD" ? amount * rate : amount / rate;
}
