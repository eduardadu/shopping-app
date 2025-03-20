import ProductTile from "./ProductTile";
import { Product } from "../utils/models";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <>
      <ul className="grid gap-x-6 gap-y-12">
        {products.map((product) => {
          return (
            <ProductTile
              key={`product-${String(product.id)}`}
              product={product}
            />
          );
        })}
      </ul>
    </>
  );
}
