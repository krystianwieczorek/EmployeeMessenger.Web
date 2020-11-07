import { apiClient } from "./apiClient";

export const getWorkspaces = () => {
  const response = apiClient.get("/api/v1/workspace/getuserworkspaces");
  return response;
};
