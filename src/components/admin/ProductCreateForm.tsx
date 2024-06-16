import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { ProductForm, createProduct, editProduct, uploadProductImage } from "../../api/products";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { router } from "@/main";

export function ProductCreateForm({ product }: { product?: any }) {
	const { handleSubmit, register, control, setValue, watch } = useForm<ProductForm>({
		values: { ...product, price: product?.price, sale: product?.sale },
	});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const queryClient = useQueryClient();
	
	const imageURL = watch("imageURL");

	const handleSubmitAdd = async (data: ProductForm) => {
		console.log({	data })

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

	const numberOfRowsOnDescription = product?.description.split("\n").length + 3 || 1;

	console.log({ numberOfRowsOnDescription })

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
					<div className="flex items-center">
						<Input type="file" onChange={(ev) => {
							const file = ev.target.files?.[0];

							if (!file) return;

							setSelectedFile(file);
						}} />
						<Button
							type="button"
							onClick={async () => {
								if (!selectedFile) return;

								const data = await uploadProductImage(selectedFile);

								if (!data) return;

								setValue("imageURL", data.url);
							}}
						>
							Upload
						</Button>
					</div>
				</label>
				{imageURL ? <span className="text-sm text-gray-500">Imagem atual: <a href={imageURL} target="_blank">{imageURL}</a></span> : null}

			<label>
				<span>Descrição</span>
				<Textarea rows={numberOfRowsOnDescription} {...register("description")} />
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
