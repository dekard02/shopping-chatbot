import { baseApi, ApiResponse } from './baseApi';
import { Product } from '../models/productModel';

const list = async (params?: Record<string, unknown>): Promise<ApiResponse<Product[]>> => {
  return baseApi.get<Product[]>('/products', params);
};

const getById = async (id: string): Promise<ApiResponse<Product>> => {
  return baseApi.get<Product>(`/products/${id}`);
};

const create = async (payload: Partial<Product>): Promise<ApiResponse<Product>> => {
  return baseApi.post<Product>('/products', payload);
};

const update = async (id: string, payload: Partial<Product>): Promise<ApiResponse<Product>> => {
  return baseApi.put<Product>(`/products/${id}`, payload);
};

const remove = async (id: string): Promise<ApiResponse<null>> => {
  return baseApi.del<null>(`/products/${id}`);
};

export const productsApi = { list, getById, create, update, remove };

export default productsApi;
