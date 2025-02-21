export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  paymentMethod: string;
  date: string;
  userId: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}