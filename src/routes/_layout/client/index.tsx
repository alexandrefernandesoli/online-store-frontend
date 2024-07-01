import { listClientOrdersQueryOptions } from '@/api/orders'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMainContext } from '@/contexts/MainContext'
import { OrderStatus } from '@/lib/enums'
import { formatDate, formatMoney } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'

export const Route = createFileRoute('/_layout/client/')({
  // beforeLoad: async ({ context: { queryClient } }) => {

	// 	const user = await queryClient.fetchQuery(clientDataQueryOptions)

	// 	if (!user) {
	// 		throw redirect({
	// 			to: "/login",
	// 			search: {
	// 				redirect: location.pathname,
	// 			},
	// 		});
	// 	} 

	// 	return { user }
	// },
	// staleTime: 10_000,
  component: Client,
})

function Client() {
  const router = useRouter();
  const { data } = useQuery(listClientOrdersQueryOptions)
  const { revalidadeUser } = useMainContext();

  const handleLogout = () => {
    localStorage.removeItem('clientToken')
    revalidadeUser()

    router.navigate({
      to: '/login'
    })
  }

  return <div className='flex flex-col py-8 px-12'>
    <div className='flex justify-end'>
      <Button onClick={handleLogout} variant="destructive">
        Sair
        <LogOutIcon className='ml-2' />
      </Button>
    </div>
    <h1 className='text-2xl font-bold border-b'>Pedidos</h1>
    <div className='w-full'>
      {data?.map(order => (
        <div key={order.id} className='flex flex-col gap-2 border-b py-4'>
          <div className='flex justify-between items-center text-sm'>
            <OrderStatusTag status={order.status} />

            <span>Feito em: {formatDate(order.createdAt)}</span>
          </div>
          <div className='flex flex-col gap-2'>
            {order.products.map(product => (
              <div key={product.id} className='flex justify-between'>
                <span>{product.name} <strong className='text-xs'>x{product.quantity}</strong></span>
                <span>{product.quantity}x {formatMoney(product.price)}</span>
              </div>
            ))}
          </div>
          <div className='flex justify-between'>
            <span className='font-bold'>Total</span>
            <span className='font-bold'>{formatMoney(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
}

function OrderStatusTag({ status }: { status: OrderStatus }) {
  switch (status) {
    case OrderStatus.PENDING:
      return <Badge className='bg-yellow-600 hover:bg-yellow-600/80'>Pendente</Badge>
    case OrderStatus.PROCESSING:
      return <Badge className='bg-blue-600 hover:bg-blue-600/80'>Processando</Badge>
    case OrderStatus.SHIPPED:
      return <Badge className='bg-green-600 hover:bg-green-600/80'>Enviado</Badge>
    case OrderStatus.COMPLETED:
      return <Badge className='bg-green-600 hover:bg-green-600/80'>Concluído</Badge>
    case OrderStatus.CANCELED:
      return <Badge className='bg-red-600 hover:bg-red-600/80'>Cancelado</Badge>
    case OrderStatus.REFUNDED:
      return <Badge className='bg-red-600 hover:bg-red-600/80'>Reembolsado</Badge>
  }
}