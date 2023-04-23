import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface UseFetchProps<T> {
  url: string;
  options?: AxiosRequestConfig;
  initialData?: T;
  token?: string;
}

type UseFetchReturn<T> = {
  data?: T;
  error?: AxiosError;
  isLoading: boolean;
};

function useFetch<T>({
  url,
  options,
  initialData,
  token,
}: UseFetchProps<T>): UseFetchReturn<T> {
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const headers: AxiosRequestConfig["headers"] = {};
      if (token) {
        headers.Authorization = `${token}`;
      }

      try {
        const response: AxiosResponse<T> = await axios(url, {
          ...options,
          headers,
        });
        if (response.data === 401) return [];
        setData(response.data);
      } catch (error) {
        if (error instanceof AxiosError) setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {
    data,
    error,
    isLoading,
  };
}

export default useFetch;
