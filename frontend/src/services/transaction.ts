import { Transaction } from "../types";
import api from "./api";

export const getTransactions = async (page = 1, limit = 10, filters = {}) => {
  const response = await api.get("/transactions", {
    params: { page, limit, ...filters },
  });
  return response.data;
};

export const addTransaction = async (
  transaction: Omit<Transaction, "id" | "userId">
) => {
  const response = await api.post("/transactions", transaction);
  return response.data;
};

export const updateTransaction = async (
  id: string,
  transaction: Partial<Transaction>
) => {
  const response = await api.put(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

export const getStatistics = async () => {
  const response = await api.get("/transactions/dashboard");
  return response.data;
};
