import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	return date ? format(new Date(date), "dd/MM/yyyy HH:mm:ss") : "-";
}

export function formatMoney(value: number) {
	return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
		value,
	);
}
	