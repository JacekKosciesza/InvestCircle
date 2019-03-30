export interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  currency: string;
  source: string;
  destination: string;
}
