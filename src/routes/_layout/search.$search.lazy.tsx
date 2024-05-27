import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { productSearchQueryOptions } from "../../api/products";
import { ProductGrid } from "../../components/ProductGrid";

export const Route = createLazyFileRoute("/_layout/search/$search")({
	component: () => <Search />,
});

function Search() {
	const { search } = Route.useParams();
	const { data } = useQuery(productSearchQueryOptions(search));

	return <ProductGrid data={data} />;
}
