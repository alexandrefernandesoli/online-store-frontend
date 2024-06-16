import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import axios from "axios";
import {API_URL} from "../constants/main";
import {axiosInstance} from "@/api/axios.ts";

type Result = {
	results: Product[];
	page: number;
	total: number;
	pages: number;
	limit: number;
};

export type Product = {
	id: number;
	name: string;
	price: number;
	sale: number;
	description: string;
	createdAt: string;
	updatedAt: string;
	viewedCount: number;
	selledCount: number;
	imageURL: string;
	categories?: string[];
};

export type ProductForm = {
	name: string;
	price: string;
	sale: string;
	description: string;
	imageURL: string;
};

export const fetchPublicProducts = async () => {
	return await axiosInstance
		.get<Product[]>('/public/products')
		.then((r) => r.data)
}

export const fetchProducts = async (page: number) => {
	return await axiosInstance
		.get<Result>(`/admin/products?page=${page}&limit=10&order=desc`)
		.then((r) => r.data)
};

export const fetchProductsByCategory = async (category: string) => {
	const url = new URL(`${API_URL}/products/category/${category}`);
	return await axios
		.get<Product[]>(url.toString())
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return [];
		});
};

export const fetchProduct = async (product_id: number) => {
	return await axiosInstance
	.get<Product>(`/public/products/${product_id}`)
	.then((r) => r.data)
};

export const fetchBestSellers = async () => {
	const url = new URL(`${API_URL}/products/best-sellers`);
	return await axios
		.get<Product[]>(url.toString())
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return [];
		});
};

export const fetchProductSearch = async (search: string) => {
	return await axiosInstance
	.get<Product[]>(`/public/products/search/${search}`)
	.then((r) => r.data)
};

export const uploadProductImage = async (file: File): Promise<{ url: string } | null> => {
	const formData = new FormData();
	formData.append("file", file);

	return await axiosInstance
		.post<{ url: string }>('/admin/products/upload', formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((r) => r.data)
}

export const createProduct = async (data: ProductForm) => {
	return await axiosInstance.post<Product>('/admin/products', data);
};

export const editProduct = async (data: ProductForm & { id: number }) => {
	return await axiosInstance.put<Product>(`/admin/products/${data.id}`, data);
};

export const deleteProduct = async (product_id: number) => {
	return await axiosInstance.delete(`/admin/products/${product_id}`);
};

export const productsQueryOptions = (page: number) =>
	queryOptions({
		queryKey: ["products", page],
		queryFn: () => fetchProducts(page),
		placeholderData: keepPreviousData,
	});

export const productQueryOptions = (product_id: number) =>
	queryOptions({
		queryKey: ["product", product_id],
		queryFn: () => fetchProduct(product_id),
		placeholderData: keepPreviousData,
	});

export const bestSellersQueryOptions = queryOptions({
	queryKey: ["best-sellers"],
	queryFn: fetchBestSellers,
	placeholderData: keepPreviousData,
});

export const productPublicQueryOptions = queryOptions({
	queryKey: ["public-products"],
	queryFn: fetchPublicProducts,
	placeholderData: keepPreviousData,
});

export const productSearchQueryOptions = (search: string) =>
	queryOptions({
		queryKey: ["search", search],
		queryFn: () => fetchProductSearch(search),
		placeholderData: keepPreviousData,
	});
