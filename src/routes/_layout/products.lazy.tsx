import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  ProductForm,
  createProduct,
  deleteProduct,
  productsQueryOptions,
} from "../../api/products";
import { API_URL } from "../../constants/main";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { format } from "date-fns";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

export const Route = createLazyFileRoute("/_layout/products")({
  component: () => <Products />,
});

const formatDate = (date: string) =>
  format(new Date(date), "dd/MM/yyyy HH:mm:ss");
const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );

function Products() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("id asc");
  const [inputValue, setInputValue] = useState("");
  const [fieldSelected, setFieldSelected] = useState("");
  const [isSelected, setIsSelected] = useState(0);
  const { data, isLoading } = useQuery(productsQueryOptions(page, sort));
  const { handleSubmit, register, control, setValue } = useForm<ProductForm>();
  const queryClient = useQueryClient();

  const handleSelect = (id: number, field: string) => {
    setIsSelected(id);
    setFieldSelected(field);
    setInputValue(
      data?.results?.find((product) => product.id === id)?.name ?? "",
    );
  };

  const addMutation = useMutation<any, any, ProductForm>({
    mutationFn: createProduct,
    onSuccess: () => {
      setPage(data?.pages ?? 1);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const mutation = useMutation<any, any, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmitAdd = async (data: ProductForm) => {
    await addMutation.mutateAsync(data);
  };

  const handleDelete = async (id: number) => {
    await mutation.mutateAsync(id);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col bg-slate-200 p-4 text-sm w-full mb-4">
        <form
          onSubmit={handleSubmit(handleSubmitAdd)}
          className="gap-y-2 flex flex-col"
        >
          <label>
            <span>Nome</span>
            <Input {...register("name")} />
          </label>

          <label>
            <span>Preço</span>
            <Controller
              name="price"
              control={control}
              render={({ field: { ref, onChange, ...rest } }) => (
                <NumericFormat
                  thousandSeparator=""
                  decimalSeparator=","
                  onValueChange={(target) => {
                    onChange();
                    setValue("price", target.value || "0");
                  }}
                  customInput={Input}
                  prefix="R$ "
                  decimalScale={2}
                  placeholder="R$ 0.00"
                  getInputRef={ref}
                  {...rest}
                />
              )}
            />
          </label>

          <label>
            <span>Promoção</span>
            <Controller
              name="sale"
              control={control}
              render={({ field: { ref, onChange, ...rest } }) => (
                <NumericFormat
                  thousandSeparator=""
                  decimalSeparator=","
                  onValueChange={(target) => {
                    onChange();
                    setValue("sale", target.value || "0");
                  }}
                  customInput={Input}
                  prefix="R$ "
                  decimalScale={2}
                  placeholder="R$ 0.00"
                  getInputRef={ref}
                  {...rest}
                />
              )}
            />
          </label>

          <label>
            <span>Imagem</span>
            <Input {...register("imageURL")} type="url" />
          </label>

          <label>
            <span>Descrição</span>
            <Textarea {...register("description")} />
          </label>

          <Button type="submit">Enviar</Button>
        </form>

        <a
          href={`${API_URL}/export`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center mt-2"
          download
        >
          <i className="fa-solid fa-download mr-2" />
          Baixar
        </a>
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <div className="w-full grid grid-cols-6 gap-2 rounded text-sm font-bold">
          <div className="flex items-center">
            {sort.startsWith("id") ? (
              <button
                type="button"
                onClick={() =>
                  setSort(sort === "id desc" ? "id asc" : "id desc")
                }
              >
                ID{" "}
                {sort === "id desc" ? (
                  <i className="fa-solid fa-chevron-down ml-2" />
                ) : (
                  <i className="fa-solid fa-chevron-up ml-2" />
                )}
              </button>
            ) : (
              <button type="button" onClick={() => setSort("id desc")}>
                ID
              </button>
            )}
          </div>
          <div className="flex items-center">
            {sort.startsWith("name") ? (
              <button
                type="button"
                onClick={() =>
                  setSort(sort === "name desc" ? "name asc" : "name desc")
                }
              >
                Name{" "}
                {sort === "name desc" ? (
                  <i className="fa-solid fa-chevron-down ml-2" />
                ) : (
                  <i className="fa-solid fa-chevron-up ml-2" />
                )}
              </button>
            ) : (
              <button type="button" onClick={() => setSort("name desc")}>
                Name
              </button>
            )}
          </div>
          <div className="flex items-center">
            {sort.startsWith("price") ? (
              <button
                type="button"
                onClick={() =>
                  setSort(sort === "price desc" ? "price asc" : "price desc")
                }
              >
                Price{" "}
                {sort === "price desc" ? (
                  <i className="fa-solid fa-chevron-down ml-2" />
                ) : (
                  <i className="fa-solid fa-chevron-up ml-2" />
                )}
              </button>
            ) : (
              <button type="button" onClick={() => setSort("price desc")}>
                Price
              </button>
            )}
          </div>
          <div className="flex items-center">
            {sort.startsWith("created_at") ? (
              <button
                type="button"
                onClick={() =>
                  setSort(
                    sort === "created_at desc"
                      ? "created_at asc"
                      : "created_at desc",
                  )
                }
              >
                Created{" "}
                {sort === "created_at desc" ? (
                  <i className="fa-solid fa-chevron-down ml-2" />
                ) : (
                  <i className="fa-solid fa-chevron-up ml-2" />
                )}
              </button>
            ) : (
              <button type="button" onClick={() => setSort("created_at desc")}>
                Created
              </button>
            )}
          </div>
          <div className="flex items-center">
            {sort.startsWith("updated_at") ? (
              <button
                type="button"
                onClick={() =>
                  setSort(
                    sort === "updated_at desc"
                      ? "updated_at asc"
                      : "updated_at desc",
                  )
                }
              >
                Updated{" "}
                {sort === "updated_at desc" ? (
                  <i className="fa-solid fa-chevron-down ml-2" />
                ) : (
                  <i className="fa-solid fa-chevron-up ml-2" />
                )}
              </button>
            ) : (
              <button type="button" onClick={() => setSort("updated_at desc")}>
                Updated
              </button>
            )}
          </div>
        </div>

        {/* loading */}
        {isLoading
          ? [...Array(1).keys()].map((_, index) => (
              <div
                key={`load-${index}`}
                className="w-full grid grid-cols-6 gap-2 rounded text-sm animate-pulse"
              >
                <div className="flex items-center">...</div>
                <div className="flex items-center">Carregando...</div>
                <div className="flex items-center">Carregando...</div>
                <div className="flex items-center">Carregando...</div>
                <div className="flex items-center">Carregando...</div>
              </div>
            ))
          : data?.results?.map((product, index) => (
              <div
                key={product.id + "-" + index}
                className="w-full grid grid-cols-6 gap-2 rounded text-sm"
              >
                {/* show input on cell click to edit value */}

                <div className="flex items-center w-[200px] bg-gray-50/15 px-2 py-1">
                  {product.id}
                </div>
                {isSelected === product.id && fieldSelected === "name" ? (
                  <div className="flex items-center bg-gray-50/15">
                    <input
                      type="text"
                      className="px-2 py-1 bg-transparent w-[200px] m-0 p-0 border-none"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                ) : (
                  <div
                    className="flex items-center bg-gray-50/15 px-2 py-1"
                    onClick={() => handleSelect(product.id, "name")}
                  >
                    {product.name}
                  </div>
                )}
                <div className="flex items-center bg-gray-50/15 px-2 py-1">
                  {formatMoney(product.price)}
                </div>
                <div className="flex items-center bg-gray-50/15 px-2 py-1">
                  {formatDate(product.createdAt)}
                </div>
                <div className="flex items-center bg-gray-50/15 px-2 py-1">
                  {formatDate(product.updatedAt)}
                </div>
                <div className="flex items-center px-2 py-1">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 text-sm font-bold rounded flex items-center"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="fa-solid fa-trash-alt" />
                  </button>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center mt-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l disabled:bg-blue-200 disabled:text-gray-500"
          disabled={page <= 1}
          onClick={() => setPage(1)}
        >
          <i className="fa-solid fa-angles-left" />
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 disabled:bg-blue-200 disabled:text-gray-500"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <i className="fa-solid fa-chevron-left" />
        </button>
        <div className="bg-blue-500 font-bold py-2 px-4 border-x border-white/20">
          {data?.page} de {data?.pages}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 disabled:bg-blue-200 disabled:text-gray-500"
          disabled={page === Math.ceil((data?.total ?? 1) / 10)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r disabled:bg-blue-200 disabled:text-gray-500"
          disabled={page === Math.ceil((data?.total ?? 1) / 10)}
          onClick={() => setPage(Math.ceil((data?.total ?? 1) / 10))}
        >
          <i className="fa-solid fa-angles-right" />
        </button>
        <div className="flex items-center ml-2">Total: {data?.total}</div>
      </div>
    </div>
  );
}
