import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import React, { Suspense } from "react";
import "../globals.css";
import { AdminAuthContextType } from "../contexts/AdminAuthContext";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AdminAuthContextType;
}>()({
  component: Root,
  notFoundComponent: () => <div>Not Found</div>,
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export function Root() {
  return (
    <>
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition="top-right" /> */}
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </>
  );
}
