import type { Product } from "./products";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { axiosInstance, axiosClientInstance } from "@/api/axios.ts";

export type Order = {
  id: number;
  total: number;
  clientEmail: string;
  products: (Product & { quantity: number })[] ;
  createdAt: string;
  updatedAt: string;
};

export type OrderCreation = {
  products: {
    productId: number;
    quantity: number;
  }[];
};

export const fetchOrders = async () => {
  return await axiosInstance.get<Order[]>("/admin/orders").then((r) => r.data);
};

export const fetchClientOrders = async () => {
  return await axiosClientInstance
    .get<Order[]>("/client/orders")
    .then((r) => r.data);
};

export const createOrder = async (order: OrderCreation) => {
  return await axiosClientInstance
    .post<Order>("/client/orders", order)
    .then((r) => r.data);
};

export const listOrdersQueryOptions = queryOptions({
  queryKey: ["orders"],
  queryFn: fetchOrders,
  placeholderData: keepPreviousData,
});

export const listClientOrdersQueryOptions = queryOptions({
  queryKey: ["clientOrders"],
  queryFn: fetchClientOrders,
  placeholderData: keepPreviousData,
});