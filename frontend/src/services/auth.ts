import api from "./api";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async ({ email, password, name }: any) => {
  const response = await api.post("/auth/register", { email, password, name });
  return response.data;
};
