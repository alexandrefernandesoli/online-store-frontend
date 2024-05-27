import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/login")({
	component: () => <Login />,
});

function Login() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center bg-gray-200">
			<form
				className="font-dosis flex flex-col items-center h-96 gap-4"
				onSubmit={(ev) => ev.preventDefault()}
			>
				<h1 className="text-5xl">Conecte-se</h1>
				<p className="text-lg text-gray-500">
					Digite seu email para se cadastrar ou entrar.
				</p>
				<input
					type="email"
					placeholder="johndoe@email.com"
					className="border text-gray-800 border-gray-500 px-4 py-2 text-lg w-full bg-transparent rounded-md"
				/>

				<button className="bg-gray-800 text-white px-4 py-2 rounded-md w-full">
					Entrar
				</button>
			</form>
		</div>
	);
}
