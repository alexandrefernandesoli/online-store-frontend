import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/_admin")({
	component: AdminLayout,
});

function AdminLayout() {
	return <>
		<Helmet>
			<title>Loja Online - Administração</title>
		</Helmet>
		<Outlet />
	</>;
}
