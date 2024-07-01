import { orderQueryOptions, setOrderStatus } from '@/api/orders';
import { OrderStatusCombo } from '@/components/OrderStatusCombobox';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { formatDate, formatMoney } from '@/lib/utils';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/_authenticated/orders/$id')({
  loader: ({ context: { queryClient }, params: { id } }) => {
		return queryClient.ensureQueryData(
			orderQueryOptions(Number.parseInt(id)),
		);
	},
  component: OrderAdmin
})

function OrderAdmin() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();

	const { data: order } = useSuspenseQuery(
		orderQueryOptions(Number.parseInt(id)),
	);

  const handleStatusChange = async (status: number) => {
    await setStatusMutation.mutateAsync({ orderId: order.id, status });
  }
  
	const setStatusMutation = useMutation<any, any, { orderId: number, status: number }>({
		mutationFn: setOrderStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["order", Number.parseInt(id)] });
		},
		onError: (error) => {
			console.error(error);
		},
	});

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
                <Link to={"/admin/orders"}>Pedidos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pedido #{order?.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='flex w-full bg-slate-50 flex-col p-4 rounded'>
          <h1 className='text-lg'>Pedido #{order?.id}</h1>
          <p>Cliente: {order?.client.firstName + ' ' + order?.client.lastName}</p>
          <p>Total: {formatMoney(order?.total)}</p>
          <p>Feito em: {formatDate(order?.createdAt)}</p>

          <OrderStatusCombo initialValue={order?.status.toString()} onChange={value => handleStatusChange(Number(value))} />

          <hr className='my-4' />
          
          <h2 className='text-xl mb-2'>Produtos</h2>

          {order?.products.map(product => (
            <div key={product.id} className='flex justify-between'>
              <span>{product.name} <strong>x{product.quantity}</strong></span>
              <span>{product.quantity}x {formatMoney(product.price)}</span>
              <span>{formatMoney(product.price * product.quantity)}</span>
            </div>
          ))}              
        </div>
    </div>
  )
}