import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/main";

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

export const fetchProducts = async (page: number, sort = "product_id desc") => {
	const url = new URL(`${API_URL}/products`);

	url.search = new URLSearchParams({
		page: page.toString(),
		limit: "15",
		sort: sort,
		order: 'desc'
	}).toString();
	const products = await axios
		.get<Result>(url.toString())
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return { results: [], page: 1, total: 0, pages: 1, limit: 10 };
		});

	return products;
};

export const fetchProductsByCategory = async (category: string) => {
	const url = new URL(`${API_URL}/products/category/${category}`);
	const products = await axios
		.get<Product[]>(url.toString())
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return [];
		});

	return products;
};

export const fetchProduct = async (product_id: number) => {
	const url = new URL(`${API_URL}/products/${product_id}`);
	const product = await axios
		.get<Product>(url.toString())
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return null;
		});

	return product;
};

export const fetchBestSellers = async () => {
	const url = new URL(`${API_URL}/products/best-sellers`);
	const products = await axios
		.get<Product[]>(url.toString())
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return [];
		});

	return products;
};

export const fetchProductSearch = async (search: string) => {
	const url = new URL(`${API_URL}/products/search/${search}`);
	const products = await axios
		.get<Product[]>(url.toString())
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return [];
		});

	return products;
};

export const createProduct = async (data: ProductForm) => {
	const url = new URL(`${API_URL}/products`);
	const response = await axios
		.post<Product>(url.toString(), data)
		.catch((e) => {
			console.error(e);
			return null;
		});

	return response;
};

export const editProduct = async (data: ProductForm & { id: number }) => {
	const url = new URL(`${API_URL}/products/${data.id}`);
	const response = await axios
		.put<Product>(url.toString(), data)
		.catch((e) => {
			console.error(e);
			return null;
		});

	return response;
};

export const deleteProduct = async (product_id: number) => {
	const url = new URL(`${API_URL}/products/${product_id}`);
	const response = await axios.delete(url.toString()).catch((e) => {
		console.error(e);
		return null;
	});

	return response;
};

export const productsQueryOptions = (page: number, sort = "id") =>
	queryOptions({
		queryKey: ["products", page, sort],
		queryFn: () => fetchProducts(page, sort),
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

export const productSearchQueryOptions = (search: string) =>
	queryOptions({
		queryKey: ["search", search],
		queryFn: () => fetchProductSearch(search),
		placeholderData: keepPreviousData,
	});
