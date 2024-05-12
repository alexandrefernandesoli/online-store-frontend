import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/_authenticated")({
  beforeLoad: async ({ context }) => {
    console.log("auth:", context.auth);

    if (context.auth?.user) {
      throw redirect({
        to: "/admin",
      });
    } else {
      throw redirect({
        to: "/admin/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <h1>Hello</h1>,
});
