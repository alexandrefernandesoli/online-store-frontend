import { clientDataQueryOptions } from '@/api/user';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_client')({
  component: () => <Outlet />,
  beforeLoad: async ({ context: { queryClient } }) => {
		const user = await queryClient.fetchQuery(clientDataQueryOptions)

		if (!user) {
			console.log('no user')
			throw redirect({
				to: "/login",
				search: {
					redirect: location.pathname,
				},
			});
		}

		return { user }
	},
})