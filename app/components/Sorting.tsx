import { useNavigate, useLocation } from "@remix-run/react";
import { PAGINATION_LIMIT } from "../utils/constants";

export default function Sorting({
  totalProducts,
  sort,
  setSort,
  pageCounter,
  setPageCounter,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  // Get the current category from query params
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";

  const handleSetSort = (sortType: string) => {
    setSort(sortType);
    console.log(sortType);
    setPageCounter(1);
    navigate(
      `?pageCounter=${pageCounter}${sort ? `&sort=${sortType}` : ""}${category ? `&category=${category}` : ""}`,
    );
  };

  //Remap from 1-... to 0-...
  const pageCounterRemap = Math.max(0, Number(pageCounter - 1));
  //Calculate the Id of the first product we are showing
  const firstIdOfProductShown =
    totalProducts > 0 ? pageCounterRemap * PAGINATION_LIMIT + 1 : 0;
  //How many products there will be on the last page
  const rest = totalProducts % PAGINATION_LIMIT;
  //How many items we have passed
  const interval = pageCounterRemap * PAGINATION_LIMIT;
  //Calculate if we are on the last page to show the rest of products
  const lastIdOfProductShown =
    interval + PAGINATION_LIMIT > totalProducts
      ? rest + interval
      : PAGINATION_LIMIT + interval;

  return (
    <div className="flex flex-row justify-between overflow-hidden py-10">
      <div className="relative flex h-9 items-center overflow-hidden rounded-lg border border-black bg-white">
        <select
          className="relative items-center bg-white px-4 py-2 leading-[20px] outline-none"
          onChange={(event) => handleSetSort(String(event.target.value))}
          defaultValue=""
        >
          <option value="" className="hidden">
            Sort By
          </option>
          <option value="">Default</option>
          <option value="title-asc">A-Z</option>
          <option value="price-asc">Price Asc</option>
          <option value="price-desc">Price Des</option>
        </select>
        <svg
          className="z-3 absolute right-2"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9408 6.87521C10.9778 6.83952 10.9991 6.7906 11 6.73922C11.0009 6.68784 10.9813 6.63821 10.9456 6.60124C10.9099 6.56427 10.861 6.543 10.8096 6.5421C10.7583 6.5412 10.7086 6.56074 10.6717 6.59644L8.00886 9.25923L5.34607 6.59643C5.32954 6.5744 5.30847 6.55617 5.28429 6.54299C5.2601 6.5298 5.23336 6.52197 5.20589 6.52001C5.17841 6.51806 5.15084 6.52204 5.12503 6.53167C5.09922 6.5413 5.07579 6.55636 5.05631 6.57584C5.03683 6.59532 5.02177 6.61876 5.01214 6.64456C5.0025 6.67037 4.99853 6.69794 5.00048 6.72542C5.00244 6.7529 5.01027 6.77963 5.02345 6.80382C5.03664 6.828 5.05487 6.84907 5.0769 6.8656L7.87428 9.67259C7.91022 9.70782 7.95854 9.72755 8.00886 9.72755C8.05919 9.72755 8.10751 9.70782 8.14345 9.67259L10.9408 6.87521Z"
            fill="#1F3044"
            stroke="#1F3044"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div>
        Showing {firstIdOfProductShown}-{lastIdOfProductShown} of
        {" " + totalProducts}
      </div>
    </div>
  );
}
