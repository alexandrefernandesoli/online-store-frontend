import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {axiosInstance} from "@/api/axios.ts";

export type Client = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchClients = async () => {
    return await axiosInstance
      .get<Client[]>('/admin/clients')
      .then((r) => r.data);
}

export const listClientsQueryOptions = queryOptions({
	queryKey: ["clients"],
	queryFn: fetchClients,
	placeholderData: keepPreviousData,
});