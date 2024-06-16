import type {Product} from "./products";
import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {axiosInstance} from "@/api/axios.ts";

export type Order = {
  id: number;
  total: number;
  clientEmail: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export const fetchOrders = async () => {
    return await axiosInstance
      .get<Order[]>('/admin/orders')
      .then((r) => r.data);
}

export const listOrdersQueryOptions = queryOptions({
	queryKey: ["orders"],
	queryFn: fetchOrders,
	placeholderData: keepPreviousData,
});