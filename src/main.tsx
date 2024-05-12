import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainContextProvider } from "./contexts/MainContext";
import {
  AdminAuthContextProvider,
  useAdminAuth,
} from "./contexts/AdminAuthContext";

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
  const auth = useAdminAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AdminAuthContextProvider>
        <MainContextProvider>
          <Router />
        </MainContextProvider>
      </AdminAuthContextProvider>
    </QueryClientProvider>,
  );
}
