import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { ProductForm, createProduct, editProduct } from "../../api/products";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { router } from "@/main";

export function ProductCreateForm({ product }: { product?: any }) {
	const { handleSubmit, register, control, setValue } = useForm<ProductForm>({
		values: { ...product, price: (product?.price / 100).toFixed(2), sale: (product?.sale / 100).toFixed(2) },
	});
	const queryClient = useQueryClient();

	const handleSubmitAdd = async (data: ProductForm) => {
		if (product) {
			await editMutation.mutateAsync({ ...data, id: product.id });
		} else {
			await addMutation.mutateAsync(data);
		}
	};

	const addMutation = useMutation<any, any, ProductForm>({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			router.navigate({
				to: "/admin/products"
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const editMutation = useMutation<any, any, ProductForm & { id: number }>({
		mutationFn: editProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			router.navigate({
				to: "/admin/products"
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return (
		<form
			onSubmit={handleSubmit(handleSubmitAdd)}
			className="gap-y-2 flex flex-col w-full"
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

					<div className="flex justify-end gap-2">
						<Button asChild variant="ghost">
							<Link to={"/admin/products"}>Cancelar</Link>
						</Button>
						<Button type="submit" variant="default">Salvar</Button>
					</div>
		</form>
	);
}
