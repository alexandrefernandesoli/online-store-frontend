import { Link } from "@tanstack/react-router";
import type { Product } from "../api/products";
import { useMainContext } from "../contexts/MainContext";
import { Button } from "./ui/button";

export function ProductGrid({ data }: { data: Product[] | undefined }) {
	function calcProductDiscount(product: Product) {
		return Math.floor((1 - product.sale / product.price) * 100);
	}

	const { addToCart } = useMainContext();

	return (
		<section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-12 p-8 items-center justify-items-center font-dosis">
			{data?.map((product, index) => (
				<Link
					className="w-full flex flex-col items-center gap-y-3"
					key={`item-${index}`}
					to={`/product/${product.id}`}
				>
					<img
						src={product.imageURL}
						alt={product.name}
						className="w-48 min-h-48 object-cover"
					/>
					<h3 className="font-bold text-center uppercase">{product.name}</h3>
					<div className="text-center leading-none">
						<div className="text-sm text-gray-600 leading-none mb-1">
							DE:{" "}
							<span className="line-through">
								R$ {Number(product.price / 100).toFixed(2)}
							</span>
						</div>
						<span className="font-bold text-lg mr-1 leading-none">
							POR: R$ {Number(product.sale / 100).toFixed(2)}{" "}
							{calcProductDiscount(product)}% OFF
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
					</Button>
				</Link>
			))}
		</section>
	);
}
