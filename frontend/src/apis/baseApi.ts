import axiosClient from './axiosClient';

export type ApiResponse<T> = {
  data: T;
  status: number;
};

const get = async <T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> => {
  const res = await axiosClient.get<T>(url, { params });
  return { data: res.data as T, status: res.status };
};

const post = async <T>(url: string, body?: unknown): Promise<ApiResponse<T>> => {
  const res = await axiosClient.post<T>(url, body as Record<string, unknown> | undefined);
  return { data: res.data as T, status: res.status };
};

const put = async <T>(url: string, body?: unknown): Promise<ApiResponse<T>> => {
  const res = await axiosClient.put<T>(url, body as Record<string, unknown> | undefined);
  return { data: res.data as T, status: res.status };
};

const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const res = await axiosClient.delete<T>(url);
  return { data: res.data as T, status: res.status };
};

export const baseApi = { get, post, put, del };

export default baseApi;
