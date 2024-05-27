import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Sheet, SheetTrigger } from "../components/ui/sheet";
import "../globals.css";
import { ShoppingCart } from "../components/ShoppingCart";
import { useMainContext } from "../contexts/MainContext";
import { router } from "../main";

export const Route = createFileRoute("/_layout")({
	component: Layout,
});

type SearchForm = {
	search: string;
};

function Layout() {
	const { handleSubmit, register, setValue } = useForm<SearchForm>();
	const { totalCartItems } = useMainContext();

	const submitSearch = (data: SearchForm) => {
		router.navigate({
			to: "/search/$search",
			params: {
				search: data.search,
			},
		});
		setValue("search", "");
		console.log(data);
	};

	return (
		<>
			<header className="px-12 py-4 flex gap-12 items-center bg-gray-50 text-black">
				<h1 className="font-dosis font-bold flex flex-1 text-4xl">
					<Link to={"/"}>LOJA ONLINE</Link>
				</h1>

				<form
					className="flex flex-1 w-full"
					onSubmit={handleSubmit(submitSearch)}
				>
					<div className="px-6 py-2 flex border items-center border-gray-300 rounded ml-4 w-full">
						<input
							{...register("search")}
							type="text"
							placeholder="Busque por produtos..."
							className="w-full outline-none border-none bg-transparent leading-none"
						/>
						<i className="fas fa-search text-gray-300 ml-3"></i>
					</div>
				</form>

				<div className="font-dosis flex flex-1 gap-12 justify-center">
					<Link to="/" className="font-semibold text-xl">
						SOBRE NÓS
					</Link>
					<Link to={"/products"} className="font-semibold text-xl">
						ATENDIMENTO
					</Link>
				</div>

				<div className="flex">
					<Link to={"/login"} className="mr-3">
						<i className="fas fa-user text-xl"></i>
					</Link>

					<Sheet>
						<SheetTrigger className="relative">
							<i className="fas fa-shopping-cart text-xl"></i>
							<span className="absolute font-semibold text-xs bg-red-400 rounded-full w-4 h-4 right-[-0.5rem] top-[0]">
								{totalCartItems}
							</span>
						</SheetTrigger>
						<ShoppingCart />
					</Sheet>
				</div>
			</header>
			<div className="flex gap-12 w-full px-12 py-2 bg-gray-300 text-black justify-evenly font-dosis font-semibold">
				<div>POPULARES</div>
				<Link to={"/best-sellers"}>BEST SELLERS</Link>
				<div>BOXES</div>
				<div>AUTORES FAMOSOS</div>
				<div>MANGÁS E HQ'S</div>
				<Link to={"/restrict"} className="text-red-800">
					+18
				</Link>
			</div>
			<Outlet />
			<footer className="bg-gray-300 min-h-72">FOOTER</footer>
		</>
	);
}
