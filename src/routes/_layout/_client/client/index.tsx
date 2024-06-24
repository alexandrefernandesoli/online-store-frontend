import { listClientOrdersQueryOptions } from '@/api/orders'
import { formatDate, formatMoney } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_client/client/')({
  component: Client
})

function Client() {
  const { data } = useQuery(listClientOrdersQueryOptions)

  return <div className='flex flex-col py-8 px-12'>
    <h1 className='text-2xl font-bold border-b'>Pedidos</h1>
    <div className='w-full'>
      {data?.map(order => (
        <div key={order.id} className='flex flex-col gap-2 border-b py-4'>
          <div className='flex justify-between text-sm'>
            <span>Status: ...</span> {/* TODO: Implementar status nos pedidos */}

            <span>Feito em: {formatDate(order.createdAt)}</span>
          </div>
          <div className='flex flex-col gap-2'>
            {order.products.map(product => (
              <div key={product.id} className='flex justify-between'>
                <span>{product.name} <strong className='text-xs'>x{product.quantity}</strong></span>
                <span>{formatMoney(product.sale * product.quantity)}</span>
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