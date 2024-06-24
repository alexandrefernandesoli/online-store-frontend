import { API_URL } from "@/constants/main";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const getUserData = async () => {
	const token = localStorage.getItem("token");
	console.log({ token });
	if (!token) return null;


	try {
		const { data } = await axios.get(`${API_URL}/auth/info`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log({ data })

		return data;
	} catch(err) {
		console.log(err);

		return null;
	}
};

const getClientData = async () => {
	const token = localStorage.getItem("clientToken");
	console.log({ clientToken: token });
	if (!token) return null;

	try {
		const { data } = await axios.get(`${API_URL}/auth/info`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log({ data })

		return data;
	} catch(err) {
		console.log(err);

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
