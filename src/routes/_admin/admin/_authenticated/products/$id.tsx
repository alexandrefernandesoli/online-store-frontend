import { productQueryOptions } from '@/api/products';
import { ProductCreateForm } from '@/components/admin/ProductCreateForm'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/_authenticated/products/$id')({
  loader: ({ context: { queryClient }, params: { id } }) => {
		return queryClient.ensureQueryData(
			productQueryOptions(Number.parseInt(id)),
		);
	},
  component: ProductAdmin
})


function ProductAdmin() {
  const { id } = Route.useParams();

	const { data: product } = useSuspenseQuery(
		productQueryOptions(Number.parseInt(id)),
	);

  return (
    <div className='flex flex-col flex-1 gap-2'>
      <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/admin"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link to={"/admin/products"}>Produtos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Produto #{product?.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ProductCreateForm product={product} />
    </div>
  )
}