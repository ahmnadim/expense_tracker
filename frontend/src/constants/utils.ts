export const STORAGE_KEY = {
  USER: "EXPENSE_USER",
  ACCESS_TOKEN: "EXPENSE_ACCESS_TOKEN",
  REFRESH_TOKEN: "EXPENSE_REFRESH_TOKEN",
};

export const categories = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "salary", label: "Salary" },
  { value: "other", label: "Other" },
];

export const types = [
  { value: "INCOME", label: "Income" },
  { value: "EXPENSE", label: "Expense" },
];

export const paymentMethods = [
  { value: "cash", label: "Cash" },
  { value: "credit", label: "Credit" },
  { value: "debit", label: "Debit" },
  { value: "bank", label: "Bank" },
];
