import { listOrdersQueryOptions } from "@/api/orders";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatMoney } from "@/lib/utils";
import { router } from "@/main";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/_authenticated/orders/")({
  component: () => <Orders />,
});

function Orders() {
  const { data, isLoading } = useQuery(listOrdersQueryOptions);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/admin"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pedidos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-slate-50 rounded p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email do Cliente</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Adicionado em</TableHead>
              <TableHead>Atualizado em</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? [...Array(1).keys()].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>...</TableCell>
                    <TableCell>Carregando...</TableCell>
                    <TableCell>Carregando...</TableCell>
                    <TableCell>Carregando...</TableCell>
                    <TableCell>Carregando...</TableCell>
                  </TableRow>
                ))
              : data && data.length > 0
                ? data.map((order, index) => (
                    <TableRow key={`order-${order.id}-${index}`} onMouseDown={() => {
                      router.navigate({
                        to: `/admin/orders/${order.id}`,
                      });
                    }}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.client.email}</TableCell>
                      <TableCell className="text-right">{formatMoney(order.total)}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{formatDate(order.updatedAt)}</TableCell>
                    </TableRow>
                  ))
                : null}
          </TableBody>
        </Table>
        {!data || data.length <= 0 ? (
          <div className="flex items-center justify-center w-full text-sm p-2">
            Nenhum pedido encontrado...
          </div>
        ) : null}
      </div>
    </div>
  );
}
