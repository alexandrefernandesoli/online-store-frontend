import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import { MainContextProvider, useMainContext } from "./contexts/MainContext";
import { routeTree } from "./routeTree.gen";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

// Set up a Router instance
export const router = createRouter({
	routeTree,
	context: {
		queryClient,
		auth: undefined!,
		mainContext: undefined!,
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
	const mainContext = useMainContext()

	return (
		<MainContextProvider>
			<Suspense fallback={<div className="w-full h-full bg-gray-800">Loading...</div>}>
				<RouterProvider router={router} context={{
					queryClient,
					mainContext
				}} />
			</Suspense>
		</MainContextProvider>
	);
}

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
						<Router />
				</QueryClientProvider>
				<Toaster />
			</HelmetProvider>
		,
	);
}
