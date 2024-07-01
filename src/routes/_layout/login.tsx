import { clientDataQueryOptions } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMainContext } from "@/contexts/MainContext";
import { Link, createFileRoute, redirect, useLocation, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_layout/login")({
	component: () => <Login />,
	beforeLoad: async ({ context: { queryClient }, location }) => {
    const user = await queryClient.fetchQuery(clientDataQueryOptions);

    if (user) {
      if ((location.search as { redirect: string }).redirect) {
        throw redirect({
          to: (location.search as { redirect: string }).redirect
        });
      } else {
        throw redirect({
          to: "/client"
        });
      }
    }

    return { user };
  },
});

type LoginForm = {
	email: string;
	password: string;
};

function Login() {
	const { handleClientLogin } = useMainContext();
	const { handleSubmit, register } = useForm<LoginForm>();
	const location = useLocation();
	const router = useRouter();
	
	const handleLogin = async (data: LoginForm) => {
		const response = await handleClientLogin(data.email, data.password);

		console.log({ response })

		if (location.search) {
			router.navigate({
				to: (location.search as { redirect: string }).redirect
			})
		} else {
			router.navigate({ to: '/client' });
		}
	}

	return (
		<div className="flex flex-1 flex-col items-center py-8 bg-gray-200">
			<form
				className="font-dosis flex flex-col h-96 gap-4 min-w-96"
				onSubmit={handleSubmit(handleLogin)}
			>
				<h1 className="text-5xl">Conecte-se</h1>
				
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						{...register('email', { required: true })}
						id="email"
						type="email"
						placeholder="johndoe@email.com"
						className="border text-gray-800 border-gray-500 px-4 py-2 text-lg w-full bg-transparent rounded-md"
					/>
				</div>

				<div>
					<Label htmlFor="password">Senha</Label>
					<Input
						{...register('password', { required: true })}
						id="password"
						type="password"
						placeholder="********"
						className="border text-gray-800 border-gray-500 px-4 py-2 text-lg w-full bg-transparent rounded-md"
					/>
				</div>

				<Button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md w-full">
					Entrar
				</Button>
				
				<Link to="/register" className="uppercase text-sm">Registre-se</Link>
			</form>

		</div>
	);
}
