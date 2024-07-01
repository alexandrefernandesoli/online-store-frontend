import type { Product } from "./products";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { axiosInstance, useClientAxiosInstace } from "@/api/axios.ts";
import type { OrderStatus } from "@/lib/enums";

export type Order = {
  id: number;
  total: number;
  client: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  status: OrderStatus;
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

export const fetchOrder = async (orderId: number) => {
  return await axiosInstance.get<Order>(`/admin/orders/${orderId}`).then((r) => r.data);
}

export const fetchClientOrders = async () => {
  const axiosClientInstance = useClientAxiosInstace();

  return await axiosClientInstance
    .get<Order[]>("/client/orders")
    .then((r) => r.data);
};

export const createOrder = async (order: OrderCreation) => {
  const axiosClientInstance = useClientAxiosInstace();
  return await axiosClientInstance
    .post<Order>("/client/orders", order)
    .then((r) => r.data);
};

export const setOrderStatus = async ({ orderId , status }: { orderId: number, status: OrderStatus }) => {
  return await axiosInstance
    .patch<Order>(`/admin/orders/${orderId}?status=${status}`)
    .then((r) => r.data);
}

export const orderQueryOptions = (orderId: number) =>
	queryOptions({
		queryKey: ["order", orderId],
		queryFn: () => fetchOrder(orderId),
		placeholderData: keepPreviousData,
	});

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