import { apiClient } from "./apiClient";

export const loggedUserDetails = async () => {
  const response = await apiClient.get(`/api/v1/user/userdetails`);
  return response;
};
