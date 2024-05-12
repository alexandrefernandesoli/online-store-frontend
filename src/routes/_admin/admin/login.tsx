import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAdminAuth } from "../../../contexts/AdminAuthContext";
import { useForm } from "react-hook-form";
import { router } from "../../../main";

export const Route = createFileRoute("/_admin/admin/login")({
  component: () => <Login />,
  beforeLoad: async ({ context }) => {
    if (context.auth?.user) {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

export function Login() {
  const { login } = useAdminAuth();
  const { handleSubmit, register } = useForm();
  const submitHandler = (data: any) => {
    login(data.username, data.password);

    router.navigate({
      to: "/admin",
    });
  };

  return (
    <main className="bg-black text-white w-screen h-screen flex items-center justify-center">
      <div className="w-72 h-96 p-4">
        <h1 className="text-center text-lg font-bold">ADMIN</h1>
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
