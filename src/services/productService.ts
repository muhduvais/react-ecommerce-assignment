import type { Category, Product } from "../types";
import { api } from "./api";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
}

// Get single product
export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

// Get categories
export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get('/products/categories');
    return response.data;
}

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
}