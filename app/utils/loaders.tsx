import { PAGINATION_LIMIT } from "../utils/constants";

// Loader to fetch products from the API
export const productsLoader = async ({ request }: { request: Request }) => {
  try {
    const url = new URL(request.url);
    const currPageCounter =
      Math.max(0, Number(url.searchParams.get("pageCounter")) - 1) || 0; //remap from 1-... to 0-... so the params in the url correspond to the numbers in the pagination
    const sortField = String(url.searchParams.get("sort")).split("-")[0];
    const sortOrder = String(url.searchParams.get("sort")).split("-")[1];
    const sorting = url.searchParams.get("sort")
      ? `&sortBy=${sortField}&order=${sortOrder}`
      : "";
    const currCategories = url.searchParams.get("category")
      ? `&category=${url.searchParams.get("category")}`
      : "";
    // Fetch products
    const responseProducts = await fetch(
      `https://dummyjson.com/products${currCategories ? `/category/${url.searchParams.get("category")}` : ""}?limit=${PAGINATION_LIMIT}&skip=${currPageCounter * PAGINATION_LIMIT}${sorting}`,
    );

    if (!responseProducts.ok) {
      throw new Error(
        `Failed to fetch products: ${responseProducts.status} ${responseProducts.statusText}`,
      );
    }

    const productsDetails = await responseProducts.json();

    // Fetch categories with a separate try/catch so the loader still works if it fails
    let categoriesList = [];
    try {
      const responseCategories = await fetch(
        `https://dummyjson.com/products/categories`,
      );
      if (!responseCategories.ok) {
        throw new Error(
          `Failed to fetch categories: ${responseCategories.status} ${responseCategories.statusText}`,
        );
      }
      categoriesList = await responseCategories.json();
    } catch (error) {
      console.error("Categories fetch failed:", error);
      categoriesList = []; // Return an empty array instead of failing the whole loader
    }

    return { productsDetails, categoriesList, currPageCounter };
  } catch (error) {
    console.error("Error loading data:", error);
    throw new Response("Error fetching products", { status: 500 });
  }
};
