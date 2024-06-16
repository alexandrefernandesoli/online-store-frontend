import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { productPublicQueryOptions } from "../../api/products";
import { ProductGrid } from "../../components/ProductGrid";

export const Route = createFileRoute("/_layout/best-sellers")({
	component: () => <BestSellers />,
});

function BestSellers() {
	const { data } = useQuery(productPublicQueryOptions);

	return (
		<>
			<section className="w-full h-72 bg-best-sellers-section bg-cover">
				<div className="w-full h-72 flex items-center px-48 bg-black/60">
					<div className="text-white">
						<h1 className="text-6xl mb-2">Best Sellers</h1>
						<h2 className="text-xl">
							Explore nossa seção com os clássicos mais vendidos
						</h2>
					</div>
				</div>
			</section>
			<ProductGrid data={data} />
		</>
	);
}
