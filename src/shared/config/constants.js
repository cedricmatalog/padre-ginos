export const DEFAULT_PIZZA_TYPE = "Pepperoni";
export const DEFAULT_PIZZA_SIZE = "M";

const isTest = import.meta.env.MODE === "test";
export const BASE_URL = isTest ? "" : import.meta.env.VITE_API_URL;
