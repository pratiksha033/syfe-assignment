export type Currency = "INR" | "USD";

export interface Contribution {
  amount: number;
  date: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currency: Currency;
  contributions: Contribution[];
}
