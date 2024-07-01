import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { API_URL } from "../constants/main";
import { router } from "../main";

export type AdminAuthContextType = {
	user?: {
		id: number;
		email: string;
		name: string;
	} | null;
	isLoading: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType>(
	{} as AdminAuthContextType,
);

const getUserData = async () => {
	const token = localStorage.getItem("token");
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

async function loginHandler({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const response = await axios.post(
		`${API_URL}/auth/login`,
		{
			usernameOrEmail: email,
			password,
		},
	);

	const { accessToken } = response.data;
	localStorage.setItem("token", accessToken);

	return response.data;
}

async function logoutHandler() {
	localStorage.removeItem("token");
	localStorage.removeItem("tokenExpires");
}

export function AdminAuthContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const queryClient = useQueryClient();
	const {
		data: user,
		isLoading,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getUserData,
		retry: false,
	});

	useEffect(() => {
		router.invalidate();
	}, [user, isLoading]);

	const loginMutation = useMutation<
		any,
		any,
		{ email: string; password: string }
	>({
		mutationFn: loginHandler,
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const logoutMutation = useMutation({
		mutationFn: logoutHandler,
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const login = async (email: string, password: string) => {
		await loginMutation.mutateAsync({ email, password });
	};

	const logout = async () => {
		await logoutMutation.mutateAsync();
	};

	return (
		<AdminAuthContext.Provider
			value={{
				user: user,
				isLoading: false,
				login,
				logout,
			}}
		>
			{children}
		</AdminAuthContext.Provider>
	);
}

export function useAdminAuth() {
	return useContext(AdminAuthContext);
}
