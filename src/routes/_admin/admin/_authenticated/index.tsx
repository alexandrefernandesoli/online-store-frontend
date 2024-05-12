import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/_authenticated/")({
  component: Admin,
});

function Admin() {
  return <div>IN</div>;
}
