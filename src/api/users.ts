import axios from "axios";
import { API_URL } from "../constants/main";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const fetchUsers = async () => {
	const url = new URL(`${API_URL}/users/list`);

	const users = await axios
		.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
		.then((r) => r.data)
		.catch((e) => {
			console.error(e);
			return [];
		});

	return users;
};

export const usersQueryOptions = queryOptions({
	queryKey: ["users"],
	queryFn: fetchUsers,
	placeholderData: keepPreviousData,
});