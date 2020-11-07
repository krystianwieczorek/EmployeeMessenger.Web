import { apiClient } from "./apiClient";

export const registerClient = async (data) => {
  const response = await apiClient.post(`/api/v1/identity/register`, data);
  return response;
};
