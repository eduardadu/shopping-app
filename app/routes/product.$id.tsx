import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useCart } from "../utils/shopContext";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params; // Get the ID from the URL path

  if (!id) {
    return redirect("/");
  }

  // Fetch product details using the ID
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const productDetails = await response.json();
  if (!productDetails || !productDetails.title) {
    return redirect("/");
  }
  return productDetails;
};

// **Meta function that dynamically sets the title and description**
export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return [
      { title: "Product Not Found" },
      { name: "description", content: "This product does not exist." },
    ];
  }
  return [
    { title: `${data.title} - The Online Shop` },
    {
      name: "description",
      content:
        data.description || "No further details were found for this product.",
    },
  ];
};

export default function ProductPage() {
  const product = useLoaderData<typeof loader>();
  const { images, title, price, description, id } = product;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: id,
      title: title || "",
      price: price || 0,
      quantity: 1,
      image: images[0] || "",
    };

    addToCart(cartItem);
  };

  return (
    <section className="flex flex-wrap gap-12 bg-white px-12">
      <div className="aspect-[896/542] min-w-[500px] flex-[2]">
        <img
          src={images[0]}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-[1] py-6 font-shop">
        <div className="flex max-w-[500px] flex-col gap-6">
          <div>
            <h2 className="text-h2 font-bold leading-h2">{title}</h2>
            <h2 className="text-h2 font-bold">${price}</h2>
          </div>
          <button
            className="h-9 w-full min-w-[400px] bg-main-blue py-2 font-button leading-button text-white"
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to Cart
          </button>
          <div className="mt-4 flex flex-col gap-2">
            <h4 className="">Product Details</h4>
            <p className="">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
