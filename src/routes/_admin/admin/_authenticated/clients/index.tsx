import { listClientsQueryOptions } from "@/api/clients";
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
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/_authenticated/clients/")({
  component: () => <Clients />,
});

function Clients() {
  const { data, isLoading } = useQuery(listClientsQueryOptions);

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
              <BreadcrumbPage>Clientes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-gray-100 rounded p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email do Cliente</TableHead>
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
                ? data.map((client, index) => (
                    <TableRow key={`order-${client.id}-${index}`}>
                      <TableCell>{client.id}</TableCell>
                      <TableCell>
                        {client.firstName + " " + client.lastName}
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{formatDate(client.createdAt)}</TableCell>
                      <TableCell>{formatDate(client.updatedAt)}</TableCell>
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
