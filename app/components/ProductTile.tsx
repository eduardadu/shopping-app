import { Link } from "@remix-run/react";
import { Product } from "../utils/models";

export default function ProductTile({ product }: { product: Product }) {
  const { id, title, images, price } = product;
  return (
    <>
      <Link
        to={`/product/${id.toString()}`}
        key={id}
        className="flex flex-grow-[0] flex-col gap-3"
      >
        <div className="relative aspect-square w-full overflow-hidden hover:opacity-80">
          <img
            src={images[0].toString()}
            alt={title}
            className="absolute top-0 aspect-square w-full overflow-hidden object-contain"
          />
          <div className="absolute h-full w-full bg-slate-300 opacity-10 hover:bg-slate-700"></div>
        </div>

        <div className="max-h-10">
          <h2>{title}</h2>
          <p>${price}</p>
        </div>
      </Link>
    </>
  );
}
