import axios from "axios";
import configuration from "../helpers/configFile";
import { Redirect } from "react-router-dom";
import React from "react";

export const apiClient = axios.create({
  baseURL: configuration.apiUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "​/api​/v1​/identity​/refresh"
    ) {
      return <Redirect to="/login" />;
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("/api/v1/identity/refresh", {
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            const newToken = localStorage.getItem("token");
            console.log("refresh");
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer  ${newToken}`;
            return axios(originalRequest);
          }
        });
    }

    return Promise.reject(error);
  }
);
