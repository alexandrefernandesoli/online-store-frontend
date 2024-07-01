import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { productQueryOptions } from "../../api/products";
import { Button } from "../../components/ui/button";
import { useMainContext } from "../../contexts/MainContext";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/_layout/product/$productId")({
	loader: ({ context: { queryClient }, params: { productId } }) => {
		return queryClient.ensureQueryData(
			productQueryOptions(Number.parseInt(productId)),
		);
	},
	component: () => <Product />,
});

function Product() {
	const { productId } = Route.useParams();
	const { addToCart } = useMainContext();

	const { data: product } = useSuspenseQuery(
		productQueryOptions(Number.parseInt(productId)),
	);

	const createMarkup = (text: string | undefined) => {
		if (!text) return { __html: '' };
		// Replace line breaks with <br> and paragraphs with <p> tags
		const htmlText = text
			.split('\n\n').map(paragraph => `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`)
			.join('');

		return { __html: htmlText };
	}

	return (
		<div className="bg-white">
			<Helmet>
				<title>{product?.name} - Loja Online</title>
			</Helmet>
			<div className="flex px-24 py-12 gap-12">
				<img src={"/" + product?.imageURL} alt={product?.name} className="w-80 h-full" />
				<div className="flex flex-col flex-1">
					{/* <div className="text-gray-700 mb-4">{`Best Sellers -> Something -> Anything`}</div> */}
					<h1 className="text-4xl mb-4">{product?.name}</h1>
					<div className="text-ellipsis overflow-y-hidden text-sm" dangerouslySetInnerHTML={createMarkup(product?.description)}></div>

					<div className="flex flex-col items-end justify-end h-full font-dosis">
						<div className="line-through text-2xl">
							DE: {Number(product?.price).toFixed(2)}
						</div>
						<div className="font-bold text-3xl">
							POR: {Number(product?.sale).toFixed(2)}
						</div>
						<Button
							className="px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg uppercase mt-2"
							onClick={() => (product ? addToCart(product) : null)}
						>
							<i className="fas fa-cart-plus mr-2"></i>
							Adicionar ao carrinho
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
