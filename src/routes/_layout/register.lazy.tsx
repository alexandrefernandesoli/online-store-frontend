import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const Route = createLazyFileRoute('/_layout/register')({
  component: Register
})

type RegisterForm = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirm: string;
};



function Register() {
	const { handleSubmit, register } = useForm<RegisterForm>();

	const handleSignup = async (data: RegisterForm) => {
		if (data.password !== data.passwordConfirm) {
			return;
		}

		try {
			await axios.post('http://localhost:8888/public/signup', data);
		} catch (err) {
		}
	}

	return (
		<div className="flex flex-1 flex-col items-center justify-center bg-gray-200 py-8">
			<form
				className="font-dosis flex flex-col gap-4 min-w-96"
				onSubmit={handleSubmit(handleSignup)}
			>
				<h1 className="text-5xl">Registrar-se</h1>

        <div>
					<Label htmlFor="firstName">Nome</Label>
					<Input
						{...register('firstName', { required: true })}
						id="firstName"
						type="text"
						placeholder="John Doe"
						className="border text-gray-800 border-gray-500 px-4 py-2 text-lg w-full bg-transparent rounded-md"
					/>
				</div>

        <div>
					<Label htmlFor="lastName">Sobrenome</Label>
					<Input
						{...register('lastName', { required: true })}
						id="lastName"
						type="text"
						placeholder="John Doe"
						className="border text-gray-800 border-gray-500 px-4 py-2 text-lg w-full bg-transparent rounded-md"
					/>
				</div>
				
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

        <div>
					<Label htmlFor="passwordConfirm">Confirme sua senha</Label>
					<Input
						{...register('passwordConfirm', { required: true })}
						id="passwordConfirm"
						type="password"
						placeholder="********"
						className="border text-gray-800 border-gray-500 px-4 py-2 text-lg w-full bg-transparent rounded-md"
					/>
				</div>

				<Button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md w-full">
					Registrar-se
				</Button>
        
        <Link to="/login" className="uppercase text-sm">Já tem uma conta? Conecte-se</Link>
			</form>

		</div>
	);
}
