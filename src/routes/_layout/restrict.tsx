import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/restrict")({
	component: () => (
		<div className="w-full h-full flex items-center justify-center">
			<img src="http://localhost:8080/products/download/40360767.jfif" alt="Teste" />
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	),
});
