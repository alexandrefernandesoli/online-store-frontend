import { Link, Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { BoxIcon, HomeIcon, UsersIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useAdminAuth } from "../../../contexts/AdminAuthContext";

export const Route = createFileRoute("/_admin/admin/_authenticated")({
	beforeLoad: async ({ context }) => {
		if (!context.auth?.user) {
			console.log('no user');
			throw redirect({
				to: "/admin/login",
				search: {
					redirect: location.pathname,
				},
			});
		}
	},
	component: () => <AdminLayout />,
});

function AdminLayout () {
	const { user, logout } = useAdminAuth();

	return (<div className="flex-1 flex flex-col">
			<header className="bg-slate-200 p-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl">Painel de Administração</h1>
					<div className="flex gap-4 items-center">
					{user?.name}
						<Button onClick={logout}>Logout</Button>
					</div>
				</div>
			</header>
			<div className="flex flex-1">
				<nav className="w-48 bg-slate-200 min-h-full flex flex-col items-center gap-2 pt-4 px-2 text-center">
							<Link to="/admin" className="flex justify-center items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-300" activeOptions={{
								exact: true
							}} activeProps={{
								className: "text-green-600"
							}}>
								<HomeIcon />
								Home
							</Link>
							<Link to="/admin/users" className="flex justify-center items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-300" activeProps={{
								className: "text-green-600"
							}}>
								<UsersIcon />
								Usuários
							</Link>
							<Link to="/admin/products" className="flex justify-center items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-300" activeProps={{
								className: "text-green-600"
							}}>
								<BoxIcon />
								Produtos
							</Link>
				</nav>
				<div className="flex flex-1 p-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
