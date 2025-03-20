import { Link } from "@remix-run/react";
import { useCart } from "../utils/shopContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navPages = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/" },
    { title: "About", url: "/" },
    { title: "Contact", url: "/" },
    { title: "Blog", url: "/" },
  ];
  const { getNumberProducts } = useCart();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-between border-b border-black bg-white px-12">
      <h1 className="mr-auto flex-[1] font-title text-logo">
        The Online Store
      </h1>
      <div className="flex flex-[1] flex-row gap-12">
        {navPages.map((page, index) => (
          <Link to={`${page.url}`} key={index}>
            <span className="cursor-pointer">{page.title}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-[1] flex-row justify-end gap-6">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.3448 16.3448M3 10.7586C3 6.47365 6.47365 3 10.7586 3C15.0436 3 18.5172 6.47365 18.5172 10.7586C18.5172 15.0436 15.0436 18.5172 10.7586 18.5172C6.47365 18.5172 3 15.0436 3 10.7586Z"
              stroke="#141414"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0003 11.069C14.2285 11.069 16.0348 9.26267 16.0348 7.03448C16.0348 4.8063 14.2285 3 12.0003 3C9.77212 3 7.96582 4.8063 7.96582 7.03448C7.96582 9.26267 9.77212 11.069 12.0003 11.069Z"
              stroke="#141414"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.75684 21.0261C3.75684 21.0261 3.75684 21.0261 3.75684 18.5293C3.75684 16.0325 6.95062 14.4844 12.0005 14.4844C17.0505 14.4844 20.2443 16.0545 20.2443 18.5293C20.2443 21.0041 20.2443 21.0261 20.2443 21.0261"
              stroke="#141414"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Link to={`/shopping-cart`}>
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2686 6.72266H3.73183V17.8951L3.7317 18.9983C3.73156 20.1029 4.62703 20.9985 5.7317 20.9985H18.2686C19.3731 20.9985 20.2686 20.1031 20.2686 18.9985V17.8951V6.72266Z"
                stroke="#141414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.2682 6.72414L17.6223 3H6.37732L3.73145 6.72414"
                stroke="#141414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.29688 10.5859C8.29688 12.3935 9.95489 13.859 12 13.859C14.0451 13.859 15.7031 12.3935 15.7031 10.5859"
                stroke="#141414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isClient && getNumberProducts() > 0 && (
              <span className="absolute left-2/4 top-2/3 flex h-5 w-5 justify-center rounded-full bg-main-blue align-baseline text-[10px] font-bold leading-[20px] text-white">
                {getNumberProducts()}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
