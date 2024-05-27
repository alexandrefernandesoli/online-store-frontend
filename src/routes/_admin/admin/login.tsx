import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useAdminAuth } from "../../../contexts/AdminAuthContext";
import { router } from "../../../main";

export const Route = createFileRoute("/_admin/admin/login")({
	component: () => <Login />,
	beforeLoad: async ({ context, location }) => {
		if (context.auth?.user) {
			if ((location.search as { redirect: string }).redirect) {
				console.log('has redirect')
				throw redirect({
					to: (location.search as { redirect: string }).redirect,
				});
			} else {
				throw redirect({
					to: "/admin",
			 	});
			}
		}
	},
});

export function Login() {
	const { login, isLoading } = useAdminAuth();
	const { handleSubmit, register } = useForm();

	const submitHandler = async (data: any) => {
		await login(data.username, data.password);

		await router.navigate({
			to: "/admin",
		});
	};

	return (
		<main className="bg-black text-white w-screen h-screen flex items-center justify-center">
			<div className="w-72 h-96 p-4">
				<h1 className="text-center text-lg font-bold">
					{isLoading ? "Carregando..." : "ADMIN"}
				</h1>
				<form
					className="flex flex-col gap-4 mt-4"
					onSubmit={handleSubmit(submitHandler)}
				>
					<input
						{...register("username")}
						type="text"
						placeholder="Usuário"
						className="p-2 bg-gray-800 text-white rounded"
					/>
					<input
						{...register("password")}
						type="password"
						placeholder="Senha"
						className="p-2 bg-gray-800 text-white rounded"
					/>

					<button className="bg-blue-500 hover:bg-blue-600 transition p-2 rounded">
						Entrar
					</button>
				</form>
			</div>
		</main>
	);
}
