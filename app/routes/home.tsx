import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { PAGINATION_LIMIT } from "../utils/constants";
import { Product, ProductResponse } from "../utils/models";
import ProductGrid from "../components/ProductGrid";
import { productsLoader } from "../utils/loaders";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import Sorting from "../components/Sorting";

export const loader = productsLoader;

export default function HomePage() {
  const { productsDetails, categoriesList, currPageCounter } =
    useLoaderData<ProductResponse>();

  const totalProducts = productsDetails.total;
  const numPages = Math.ceil(Number(totalProducts) / PAGINATION_LIMIT);
  const products = productsDetails.products as Product[];

  const [pageCounter, setPageCounter] = useState(currPageCounter + 1 || 1);
  const [sort, setSort] = useState("");

  return (
    <section className="flex flex-row justify-between bg-white px-12 pb-12">
      <div className="w-full">
        <Sorting
          totalProducts={totalProducts}
          sort={sort}
          setSort={setSort}
          pageCounter={pageCounter}
          setPageCounter={setPageCounter}
        />
        <ProductGrid products={products} />
        <div className="flex flex-row justify-end">
          <Pagination
            pageCounter={pageCounter}
            sort={sort}
            setPageCounter={setPageCounter}
            numPages={numPages}
          />
        </div>
      </div>
      <Categories
        categoriesList={categoriesList}
        setSort={setSort}
        setPageCounter={setPageCounter}
      />
    </section>
  );
}
