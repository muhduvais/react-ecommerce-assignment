import type { Category, Product } from "../types";
import { api } from "./api";

export const getProducts = async (queryString?: string): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get(`/products${queryString ? `?${queryString}` : ""}`);
    return response.data;
}

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get('/products/categories');
    return response.data;
}

export const getProductsByCategory = async (category: string, queryString?: string): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get(`/products/category/${category}${queryString ? `?${queryString}` : ""}`);
    return response.data;
}