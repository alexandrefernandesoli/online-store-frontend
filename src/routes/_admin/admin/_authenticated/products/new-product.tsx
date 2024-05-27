import { ProductCreateForm } from '@/components/admin/ProductCreateForm'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/_authenticated/products/new-product')({
  component: ProductAdmin
})

function ProductAdmin() {
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
              <BreadcrumbPage>Novo Produto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ProductCreateForm />
    </div>
  )
}