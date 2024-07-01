import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { router } from "@/main.tsx";
import axios from "axios";
import { API_URL } from "@/constants/main";
import { axiosInstance } from "@/api/axios";
import { userDataQueryOptions } from "@/api/user";

export const Route = createFileRoute("/_admin/admin/login")({
  component: () => <Login />,
  beforeLoad: async ({ context: { queryClient }, location }) => {
    const user = await queryClient.fetchQuery(userDataQueryOptions);

    if (user) {
      if ((location.search as { redirect: string }).redirect) {
        throw redirect({
          to: (location.search as { redirect: string }).redirect,
        });
      } else {
        throw redirect({
          to: "/admin",
        });
      }
    }

    return { user };
  },
});

async function loginHandler(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    usernameOrEmail: email,
    password,
  });

  const { accessToken } = response.data;
  localStorage.setItem("token", accessToken);

  axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

  return response.data;
}

export function Login() {
  const { handleSubmit, register } = useForm();
  const submitHandler = async (data: any) => {
    await loginHandler(data.username, data.password);

    router.navigate({
			to: "/admin",
		});
  };

  return (
    <main className="bg-black text-white w-screen h-screen flex items-center justify-center">
      <div className="w-72 h-96 p-4">
        <h1 className="text-center text-lg font-bold">{"ADMIN"}</h1>
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
