import { Link } from "@tanstack/react-router";
import type { Product } from "../api/products";
import { useMainContext } from "../contexts/MainContext";
import { Button } from "./ui/button";
import { formatMoney } from "@/lib/utils";

export function ProductGrid({ data }: { data: Product[] | undefined }) {
	function calcProductDiscount(product: Product) {
		return Math.floor((1 - product.sale / product.price) * 100);
	}

	const { addToCart, shoppingCart } = useMainContext();

	const productQuantityOnCart = (product: Product) => {
		const cartItem = shoppingCart.find((item) => item.id === product.id);
		return cartItem ? cartItem.quantity : 0;
	}

	return (
		<section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-12 items-center justify-items-center font-dosis">
			{data?.map((product, index) => (
				<Link
					className="w-56 h-96 flex flex-col items-center justify-between"
					key={`item-${index}`}
					to={`/product/${product.id}`}
				>
					<img
						src={"/" + product.imageURL}
						alt={product.name}
						className="w-56 h-56 object-contain"
					/>
					<h3 className="font-bold text-center uppercase">{product.name}</h3>
					<div className="text-center leading-none">
						<div className="text-sm text-gray-600 leading-none mb-1">
							DE:{" "}
							<span className="line-through">
								{formatMoney(product.price)}
							</span>
						</div>
						<span className="font-bold text-lg mr-1 leading-none">
								POR: {formatMoney(product.sale)}{" "}
							<span className="text-red-500 text-xs">
								{calcProductDiscount(product)}% OFF
							</span>
						</span>
					</div>
					<Button
						className="uppercase"
						onClick={(ev) => [
							ev.stopPropagation(),
							ev.preventDefault(),
							addToCart(product),
						]}
					>
						<i className="fas fa-cart-plus mr-1"></i>
						Adicionar ao carrinho
						{productQuantityOnCart(product) > 0 && ` (${productQuantityOnCart(product)})`}
					</Button>
				</Link>
			))}
		</section>
	);
}
