import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { deleteProduct, productsQueryOptions } from "@/api/products";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { router } from "@/main";
import { formatMoney, formatDate } from "@/lib/utils";

export const Route = createFileRoute("/_admin/admin/_authenticated/products/")({
	component: () => <Products />,
});

function Products() {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useQuery(productsQueryOptions(page));
	const queryClient = useQueryClient();

	const mutation = useMutation<any, any, number>({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			router.navigate({
				to: "/admin/products",
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleDelete = async (id: number) => {
		await mutation.mutateAsync(id);
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-between">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild><Link to={'/admin'}>Home</Link></BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Produtos</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<Button asChild>
					<Link to={'/admin/products/new-product'}>Adicionar</Link>
				</Button>
			</div>
			

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Nome</TableHead>
						<TableHead className="text-right">Preço</TableHead>
						<TableHead className="text-right">Promoção</TableHead>
						<TableHead>Adicionado em</TableHead>
						<TableHead>Atualizado em</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{isLoading
						? [...Array(1).keys()].map((_, index) => (
								<TableRow key={index}>
									<TableCell>...</TableCell>
									<TableCell>Carregando...</TableCell>
									<TableCell>Carregando...</TableCell>
									<TableCell>Carregando...</TableCell>
									<TableCell>Carregando...</TableCell>
								</TableRow>
							))
						: data?.results?.map((product, index) => (
								<TableRow
									key={`product-${product.id}-${index}`}
								>
									<TableCell>{product.id}</TableCell>
									<TableCell onMouseDown={() => {
										router.navigate({
											to: `/admin/products/product/${product.id}`,
										});
									}}>{product.name}</TableCell>
									<TableCell className="text-right">
										{formatMoney(product.price)}
									</TableCell>
									<TableCell className="text-right">
										{formatMoney(product.sale)}
									</TableCell>
									<TableCell>{formatDate(product.createdAt)}</TableCell>
									<TableCell>{formatDate(product.updatedAt)}</TableCell>
									<TableCell>
										<button
											className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 text-sm font-bold rounded flex items-center"
											onMouseDown={(ev) => {
												ev.preventDefault();
												ev.stopPropagation();
												handleDelete(product.id);
											}}
										>
											<i className="fa-solid fa-trash-alt" />
										</button>
									</TableCell>
								</TableRow>
							))}
				</TableBody>
			</Table>

			<div className="flex justify-center mt-2">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l disabled:bg-blue-200 disabled:text-gray-500"
					disabled={page <= 1}
					onClick={() => setPage(1)}
				>
					<i className="fa-solid fa-angles-left" />
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 disabled:bg-blue-200 disabled:text-gray-500"
					disabled={page <= 1}
					onClick={() => setPage((prev) => prev - 1)}
				>
					<i className="fa-solid fa-chevron-left" />
				</button>
				<div className="bg-blue-500 font-bold py-2 px-4 border-x border-white/20">
					{data?.page} de {data?.pages}
				</div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 disabled:bg-blue-200 disabled:text-gray-500"
					disabled={page === data?.pages}
					onClick={() => setPage((prev) => prev + 1)}
				>
					<i className="fa-solid fa-chevron-right" />
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r disabled:bg-blue-200 disabled:text-gray-500"
					disabled={page === Math.ceil((data?.total ?? 1) / 10)}
					onClick={() => setPage(data?.pages!)}
				>
					<i className="fa-solid fa-angles-right" />
				</button>
				<div className="flex items-center ml-2">Total: {data?.total}</div>
			</div>
		</div>
	);
}
