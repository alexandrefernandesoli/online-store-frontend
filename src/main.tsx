import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { MainContextProvider } from "./contexts/MainContext";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

// Set up a Router instance
export const router = createRouter({
	routeTree,
	context: {
		queryClient,
		auth: undefined!,
	},
	defaultPreload: "intent",
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

function Router() {
	return (
		<Suspense fallback={<div className="w-full h-full bg-gray-800">Loading...</div>}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<QueryClientProvider client={queryClient}>
			<MainContextProvider>
				<Router />
			</MainContextProvider>
		</QueryClientProvider>,
	);
}
