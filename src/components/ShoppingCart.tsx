import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { useMainContext } from "../contexts/MainContext";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

export function ShoppingCart() {
	const {
		shoppingCart,
		addToCart,
		removeFromCart,
		totalCartValue,
		totalCartItems,
	} = useMainContext();

	return (
		<SheetContent className="flex flex-col">
			<SheetHeader>
				<SheetTitle className="flex justify-between items-center">
					<span>
						Carrinho ({totalCartItems} ite{totalCartItems === 1 ? "m" : "ns"})
					</span>
					<ShoppingCartIcon />
				</SheetTitle>
			</SheetHeader>

			<div className="flex flex-col mt-4 flex-1">
				{shoppingCart.map((product, i) => (
					<div key={i}>
						<div className="flex gap-2">
							<img src={product.imageURL} alt="" className="w-28" />
							<div className="text-center font-dosis items-center w-full h-full">
								<h3 className="font-bold text-lg">
									#{product.id} {product.name.toUpperCase()}
								</h3>
								<p className="justify-self-end text-xl">
									R$ {Number(product.sale).toFixed(2)}
								</p>
							</div>
						</div>
						<div className="flex items-center justify-center mt-4 w-full gap-4">
							<button type="button" onClick={() => removeFromCart(product)}>
								<Minus />
							</button>
							<input
								type="number"
								className="font-dosis bg-gray-200 rounded-lg w-24 py-1 text-center"
								value={product.quantity}
								readOnly
							/>
							<button type="button" onClick={() => addToCart(product)}>
								<Plus />
							</button>
						</div>
						<hr className="my-2" />
					</div>
				))}
			</div>

			<button className="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded-lg flex justify-between">
				Finalizar Compra <span>R$ {totalCartValue.toFixed(2)}</span>
			</button>
		</SheetContent>
	);
}
