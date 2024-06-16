import { createContext, useContext, useState } from "react";
import type { Product } from "../api/products";

type ProductWithQuantity = Product & { quantity: number };

type MainContextType = {
	shoppingCart: ProductWithQuantity[];
	totalCartValue: number;
	totalCartItems: number;
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;
	removeAllFromCart: (product: Product) => void;
	setQuantity: (product: Product, quantity: number) => void;
};

const MainContext = createContext<MainContextType>({} as MainContextType);

export function MainContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

export function useMainContext() {
	return useContext(MainContext);
}
