import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../api/products";
import { clientDataQueryOptions } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ProductWithQuantity = Product & { quantity: number };

export type MainContextType = {
	shoppingCart: ProductWithQuantity[];
	totalCartValue: number;
	totalCartItems: number;
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;
	removeAllFromCart: (product: Product) => void;
	cleanCart: () => void;
	setQuantity: (product: Product, quantity: number) => void;
	isUserLogged: boolean;
	user?: any;
	revalidadeUser: () => void;
	handleClientLogin: (user: string, password: string) => void;
};

const MainContext = createContext<MainContextType>({} as MainContextType);

export function MainContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data, refetch } = useQuery(clientDataQueryOptions);
	const [user, setUser] = useState(data);

	const revalidadeUser = () => {
		refetch();
	}

	async function handleClientLogin(user: string, password: string) {
		const response =  await axios.post('http://localhost:8888/auth/login', {
			usernameOrEmail: user,
			password: password
		});

		localStorage.setItem('clientToken', response.data.accessToken);

		refetch();

		return response.data;
	}

	const isUserLogged = user !== undefined && user !== null;

	useEffect(() => {
		setUser(data);
	}, [data]);

	useEffect(() => {
		setInterval(() => {
			revalidadeUser();
		}, 5000)
	}, [])

	const [shoppingCart, setShoppingCart] = useState<ProductWithQuantity[]>(
		[] as ProductWithQuantity[],
	);

	function setQuantity(product: Product, quantity: number) {
		setShoppingCart((prev) => {
			const productIndex = prev.findIndex((p) => p.id === product.id);

			if (productIndex === -1) {
				return prev;
			}

			const updatedCart = [...prev];
			updatedCart[productIndex].quantity = quantity;

			return updatedCart;
		});
	}

	function addToCart(product: Product) {
		setShoppingCart((prev) => {
			const productIndex = prev.findIndex((p) => p.id === product.id);

			if (productIndex === -1) {
				return [
					...prev,
					{
						...product,
						quantity: 1,
					},
				];
			}

			const updatedCart = [...prev];
			updatedCart[productIndex].quantity += 1;

			return updatedCart;
		});
	}

	function removeFromCart(product: Product) {
		setShoppingCart((prev) => {
			const productIndex = prev.findIndex((p) => p.id === product.id);

			if (productIndex === -1) {
				return prev;
			}

			const updatedCart = [...prev];
			updatedCart[productIndex].quantity -= 1;

			if (updatedCart[productIndex].quantity <= 0) {
				updatedCart.splice(productIndex, 1);
			}

			return updatedCart;
		});
	}

	function removeAllFromCart(product: Product) {
		setShoppingCart((prev) => {
			const productIndex = prev.findIndex((p) => p.id === product.id);

			if (productIndex === -1) {
				return prev;
			}

			const updatedCart = [...prev];
			updatedCart[productIndex].quantity = 0;

			if (updatedCart[productIndex].quantity <= 0) {
				updatedCart.splice(productIndex, 1);
			}

			return updatedCart;
		});
	}

	const totalCartValue = shoppingCart.reduce(
		(acc, product) => acc + product.sale * product.quantity,
		0,
	);

	const totalCartItems = shoppingCart.reduce(
		(acc, product) => acc + product.quantity,
		0,
	);

	function cleanCart() {
		setShoppingCart([]);
	}

	return (
		<MainContext.Provider
			value={{
				shoppingCart,
				totalCartValue,
				totalCartItems,
				setQuantity,
				addToCart,
				removeFromCart,
				removeAllFromCart,
				isUserLogged,
				user,
				revalidadeUser,
				handleClientLogin,
				cleanCart
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

export function useMainContext() {
	return useContext(MainContext);
}
