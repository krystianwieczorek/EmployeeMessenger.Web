import { apiClient } from "./apiClient";

export const authClient = async (data) => {
  const response = await apiClient.post(`/api/v1/identity/login`, data);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response;
};
