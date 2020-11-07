import { apiClient } from "./apiClient";

export const newWorkspace = async (data) => {
  const response = await apiClient.post(
    `/api/v1/workspace/createworkspace`,
    data
  );
  return response;
};
