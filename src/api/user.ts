import { API_URL } from "@/constants/main";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const getUserData = async () => {
	const token = localStorage.getItem("token");
	if (!token) return null;

	try {
		const { data } = await axios.get(`${API_URL}/auth/info`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!data) {
			localStorage.removeItem("token");
			return null;
		}
		
		if (data.role !== "ADMIN") {
			localStorage.removeItem("token");
			return null;
		}

		return data;
	} catch(err) {
		return null;
	}
};

export const getClientData = async () => {
	const token = localStorage.getItem("clientToken");
	if (!token) return null;

	try {
		const { data } = await axios.get(`${API_URL}/auth/info`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return data;
	} catch(err) {
		return null;
	}
};


export const userDataQueryOptions = queryOptions({
		queryKey: ["user"],
		queryFn: () => getUserData(),
		placeholderData: keepPreviousData,
	});

	export const clientDataQueryOptions = queryOptions({
		queryKey: ["client"],
		queryFn: () => getClientData(),
		placeholderData: keepPreviousData,
	});
