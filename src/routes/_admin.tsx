import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return <Outlet />;
}
