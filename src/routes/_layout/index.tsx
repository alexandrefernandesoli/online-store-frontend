import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "../../api/products";
import { ProductGrid } from "../../components/ProductGrid";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../components/ui/carousel";

export const Route = createFileRoute("/_layout/")({
	component: () => <Home />,
});

function Home() {
	const { data } = useQuery(productsQueryOptions(1, "id"));
	
	return (
		<>
			<Carousel className="w-full relative">
				<CarouselContent className="w-full gap-0">
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index} className="w-full">
							<div className="min-h-[50vh] w-full bg-gray-500 text-white flex items-center justify-center text-5xl font-dosis">
								BANNER {index + 1}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselNext className="absolute z-20 w-24 right-0 h-full bg-transparent border-0 hover:bg-transparent" />
				<CarouselPrevious className="absolute z-20 w-24 h-full left-0 bg-transparent border-0 hover:bg-transparent" />
			</Carousel>
			<div className="px-12">
				<ProductGrid data={data?.results} />
			</div>
		</>
	);
}
