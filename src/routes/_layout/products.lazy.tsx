import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/products")({
	component: () => <h1>XD BRBR</h1>,
});
