import type { PizzaSize, PizzaSizeOption } from "../types";

export const DEFAULT_PIZZA_TYPE = "Pepperoni";
export const DEFAULT_PIZZA_SIZE: PizzaSize = "M";

const isTest = import.meta.env.MODE === "test";
export const BASE_URL: string = isTest ? "" : import.meta.env.VITE_API_URL;

export const PIZZA_SIZES: PizzaSizeOption[] = [
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
];
