import { useNavigate, useLocation } from "@remix-run/react";

export default function Pagination({
  pageCounter,
  numPages,
  sort,
  setPageCounter,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current category from query params
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";

  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    setPageCounter(pageNumber); // Update state
    navigate(
      `?pageCounter=${pageNumber}${sort ? `&sort=${sort}` : ""}${category ? `&category=${category}` : ""}`,
    );
  };
  // Function to go to the next page
  const nextPage = () => {
    const newPageCounter = pageCounter + 1;
    setPageCounter(newPageCounter); // Update pageCounter state first
    navigate(
      `?pageCounter=${newPageCounter}${sort ? `&sort=${sort}` : ""}${category ? `&category=${category}` : ""}`,
    );
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (pageCounter > 0) {
      const newPageCounter = pageCounter - 1;
      setPageCounter(newPageCounter); // Update pageCounter state first
      navigate(
        `?pageCounter=${newPageCounter}${sort ? `&sort=${sort}` : ""}${category ? `&category=${category}` : ""}`,
      ); // Update the URL with the new pageCounter
    }
  };

  return (
    <div className="flex flex-row">
      <button
        onClick={prevPage}
        disabled={pageCounter === 0}
        className="group flex h-9 w-9 items-center justify-center rounded-sm hover:bg-main-blue"
      >
        <svg
          className="hover:fill-white"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="group-hover:fill-white group-hover:stroke-white"
            d="M14.9132 18.983C14.9965 19.0693 15.1107 19.1189 15.2306 19.121C15.3504 19.1231 15.4662 19.0775 15.5525 18.9942C15.6388 18.911 15.6884 18.7968 15.6905 18.6769C15.6926 18.557 15.647 18.4412 15.5637 18.355L9.35053 12.1418L15.5637 5.92858C15.6151 5.89002 15.6577 5.84086 15.6884 5.78443C15.7192 5.728 15.7375 5.66561 15.742 5.6015C15.7466 5.53739 15.7373 5.47305 15.7148 5.41283C15.6924 5.35262 15.6572 5.29794 15.6118 5.25249C15.5663 5.20704 15.5116 5.17189 15.4514 5.14941C15.3912 5.12694 15.3269 5.11767 15.2628 5.12222C15.1986 5.12678 15.1363 5.14506 15.0798 5.17582C15.0234 5.20659 14.9742 5.24912 14.9357 5.30054L8.38602 11.8278C8.30383 11.9116 8.25779 12.0244 8.25779 12.1418C8.25779 12.2592 8.30383 12.3719 8.38602 12.4558L14.9132 18.983Z"
            fill="black"
            stroke="black"
            strokeWidth="0.3"
          />
        </svg>
      </button>
      {[...Array(numPages)].map((_, i) => {
        const startPage = Math.max(1, pageCounter - 2);
        const endPage =
          i >= 5
            ? Math.min(numPages, pageCounter + 2)
            : Math.min(numPages, pageCounter + 5);
        if (i + 1 < startPage || i + 1 > endPage) return null;
        return (
          <button
            key={i}
            className={`h-9 w-9 rounded-sm p-2 hover:bg-main-blue hover:text-white ${pageCounter === i + 1 ? "bg-main-blue text-white" : ""}`}
            onClick={() => handlePageChange(i + 1)}
            disabled={pageCounter === i + 1}
          >
            {i + 1}
          </button>
        );
      })}
      <button
        onClick={nextPage}
        className="group flex h-9 w-9 items-center justify-center rounded-sm hover:bg-main-blue"
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="group-hover:fill-white group-hover:stroke-white"
            d="M9.08676 5.25917C9.00347 5.17291 8.88933 5.12327 8.76945 5.12116C8.64956 5.11906 8.53375 5.16467 8.44749 5.24795C8.36123 5.33124 8.31159 5.44538 8.30949 5.56526C8.30739 5.68515 8.35299 5.80096 8.43628 5.88721L14.6495 12.1004L8.43628 18.3136C8.38486 18.3522 8.34233 18.4013 8.31156 18.4578C8.2808 18.5142 8.26252 18.5766 8.25796 18.6407C8.25341 18.7048 8.26268 18.7691 8.28516 18.8294C8.30763 18.8896 8.34278 18.9443 8.38823 18.9897C8.43368 19.0351 8.48836 19.0703 8.54858 19.0928C8.60879 19.1152 8.67313 19.1245 8.73724 19.12C8.80135 19.1154 8.86374 19.0971 8.92017 19.0664C8.9766 19.0356 9.02576 18.9931 9.06433 18.9417L15.614 12.4144C15.6962 12.3306 15.7422 12.2178 15.7422 12.1004C15.7422 11.983 15.6962 11.8702 15.614 11.7864L9.08676 5.25917Z"
            fill="black"
            stroke="black"
            strokeWidth="0.3"
          />
        </svg>
      </button>
    </div>
  );
}
