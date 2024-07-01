import { OrderCreation, createOrder } from '@/api/orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMainContext } from '@/contexts/MainContext';
import { formatMoney } from '@/lib/utils';
import { router } from '@/main';
import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';

export const Route = createFileRoute('/_layout/cart')({
  component: () => <Cart />
})

function Cart() {
  const { shoppingCart, totalCartValue, setQuantity, isUserLogged, cleanCart } = useMainContext();

  const handleCreateOrder = async () => {
    const order: OrderCreation = {
      products: shoppingCart.map(product => ({ productId: product.id, quantity: product.quantity }))
    }

    if (!isUserLogged) {
      router.navigate({
        to: '/login',
        search: { redirect: '/cart' }
      })
      return;
    }

    createOrder(order)

    cleanCart()

    toast.success('Pedido realizado com sucesso!')
  }

  return (
    <div className='flex flex-1 gap-2 px-8 py-8'>
			<Helmet>
				<title>Carrinho - Loja Online</title>
			</Helmet>
      <div className='flex flex-col flex-1 divide-y border-t '>
        {shoppingCart.map((product) => (
          <div key={product.id} className='py-2 flex max-h-52 justify-between flex-1 gap-2'>
            <div className='flex flex-1 gap-4'>
              <img className='w-32 h-48' src={product.imageURL} alt={product.name} />
              <div className='flex flex-col justify-between'>
                <h2 className='mb-2'>{product.name}</h2>
                <label className='text-sm'>
                  Quantidade
                  <Input type='number' className='w-20 text-right' value={product.quantity} onChange={ev => setQuantity(product, parseInt(ev.target.value))}/>
                </label>
              </div>
              <div className='flex flex-col flex-1 items-end'>
                <span className='font-semibold text-xl'>{formatMoney(product.sale)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-4 px-4'>
        <div className='flex text-lg'>Total: {formatMoney(totalCartValue)}</div>
        <Button className='bg-amber-200 hover:bg-amber-300 text-black shadow-lg' onClick={() => handleCreateOrder()}> 
          Fechar pedido
        </Button>
      </div>
    </div>
  )
}