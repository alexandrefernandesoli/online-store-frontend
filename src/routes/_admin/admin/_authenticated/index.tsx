import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/_authenticated/')({
  component: () => <div>Hello /_admin/admin/_authenticated/!</div>
})

