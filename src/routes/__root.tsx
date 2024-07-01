import "../globals.css";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { AdminAuthContextType } from "../contexts/AdminAuthContext";
import type { MainContextType } from "../contexts/MainContext";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	auth: AdminAuthContextType;
	mainContext: MainContextType;
}>()({
	component: Root,
	notFoundComponent: () => <div>Not Found</div>,
	pendingComponent: () => <div>Loading...</div>,
});

export function Root() {
	return (
		<>
			<Outlet />
		</>
	);
}
