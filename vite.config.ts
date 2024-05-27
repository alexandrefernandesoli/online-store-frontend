import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite(),
		biomePlugin(),
	],
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
});
