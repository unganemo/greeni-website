import { useState } from "react";
import axios, { AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Options {
  body?: any;
}

type UseApiReturnType<T> = [
  (
    url: string,
    method: HttpMethod,
    token: string,
    options?: Options
  ) => Promise<T | undefined>,
  boolean,
  string | null
];

const useApi = <T = any>(): UseApiReturnType<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (
    url: string,
    method: HttpMethod,
    token: string,
    options?: Options
  ): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: options?.body,
        headers: {
          Authorization: token,
        },
      });
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      setError(error?.response?.data?.message ?? "An error occurred.");
    }
  };

  const get = async (
    url: string,
    token: string,
    options?: Options
  ): Promise<T | undefined> => {
    return handleRequest(url, "GET", token, options);
  };

  const post = async (
    url: string,
    token: string,
    options?: Options
  ): Promise<T | undefined> => {
    return handleRequest(url, "POST", token, options);
  };

  const put = async (
    url: string,
    token: string,
    options?: Options
  ): Promise<T | undefined> => {
    return handleRequest(url, "PUT", token, options);
  };

  const del = async (
    url: string,
    token: string,
    options?: Options
  ): Promise<T | undefined> => {
    return handleRequest(url, "DELETE", token, options);
  };

  const api = (
    url: string,
    method: HttpMethod,
    token: string,
    options?: Options
  ): Promise<T | undefined> => {
    switch (method) {
      case "GET":
        return get(url, token, options);
      case "POST":
        return post(url, token, options);
      case "PUT":
        return put(url, token, options);
      case "DELETE":
        return del(url, token, options);
      default:
        throw new Error(`Invalid HTTP method: ${method}`);
    }
  };

  return [api, isLoading, error];
};

export default useApi;
