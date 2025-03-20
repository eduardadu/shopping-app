import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useCart } from "../utils/shopContext";

//Notes - lacking time, I did not make components for this page - it's bigger than it could be

export const loader = async () => {
  //if there was a database we would fetch the cart here, but in this case I used the local storage
  return null;
};

export const meta: MetaFunction = () => [
  { title: "Cart - The Online Shop" },
  {
    name: "description",
    content: "Your shopping cart contains the items you wish to purchase.",
  },
];

export default function CartPage() {
  useLoaderData<typeof loader>();

  const {
    addToCart,
    removeFromCart,
    cart,
    calcSubTotal,
    calcTotal,
    getShipping,
  } = useCart();

  return (
    <section className="flex flex-row flex-wrap gap-12 bg-white px-12 font-shop">
      <div className="min-w-[500px] flex-[2] text-black">
        {cart.map((product) => {
          return (
            <div
              key={product.id + product.title}
              className="flex h-[188px] flex-row gap-6 border-b border-black py-4"
            >
              <img
                className="w-[156px]"
                src={product.image}
                alt={product.title}
              />
              <div className="flex flex-col place-content-between">
                <div>
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                </div>

                <div className="flex flex-row gap-4">
                  <div className="flex h-9 w-[96px] flex-row items-center justify-around gap-2 rounded-lg border border-black px-3 py-2">
                    <button
                      className="flex items-center"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.4784 12.0938H17.6676C17.9315 12.0938 18.1455 12.2679 18.1455 12.4826C18.1455 12.6974 17.9315 12.8715 17.6676 12.8715H12.4784H6.33341C6.06945 12.8715 5.85547 12.6974 5.85547 12.4826C5.85547 12.2679 6.06945 12.0938 6.33341 12.0938H12.7129"
                          stroke="black"
                        />
                      </svg>
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      className="flex items-center"
                      onClick={() => addToCart(product)}
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6111 12.0955H12.3889V7.87326C12.3889 7.65849 12.2148 7.48438 12 7.48438C11.7852 7.48438 11.6111 7.65849 11.6111 7.87326V12.0955H7.38889C7.17411 12.0955 7 12.2696 7 12.4844C7 12.6992 7.17411 12.8733 7.38889 12.8733H11.6111V17.0955C11.6111 17.3103 11.7852 17.4844 12 17.4844C12.2148 17.4844 12.3889 17.3103 12.3889 17.0955V12.8733H16.6111C16.8259 12.8733 17 12.6992 17 12.4844C17 12.2696 16.8259 12.0955 16.6111 12.0955Z"
                          fill="#1D1D1B"
                          stroke="black"
                        />
                      </svg>
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)}>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99982 3.2262C9.30397 3.2262 8.73988 3.7903 8.73988 4.48615V5.74609H15.2598V4.48615C15.2598 3.79029 14.6957 3.2262 13.9998 3.2262H9.99982ZM16.7399 5.74609V4.48615C16.7399 2.97286 15.5131 1.74609 13.9998 1.74609H9.99982C8.48653 1.74609 7.25977 2.97286 7.25977 4.48615V5.74609H2.99982C2.5911 5.74609 2.25977 6.07743 2.25977 6.48615C2.25977 6.89487 2.5911 7.2262 2.99982 7.2262H4.25977V20.4861C4.25977 21.9995 5.48654 23.2262 6.99982 23.2262H16.9998C18.5131 23.2262 19.7399 21.9995 19.7399 20.4861V7.2262H20.9998C21.4085 7.2262 21.7399 6.89487 21.7399 6.48615C21.7399 6.07743 21.4085 5.74609 20.9998 5.74609H16.7399ZM5.73988 7.2262V20.4861C5.73988 21.182 6.30397 21.7461 6.99982 21.7461H16.9998C17.6957 21.7461 18.2598 21.182 18.2598 20.4861V7.2262H5.73988Z"
                        fill="#1F3044"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99982 10.7461C10.4085 10.7461 10.7399 11.0774 10.7399 11.4861V17.4861C10.7399 17.8949 10.4085 18.2262 9.99982 18.2262C9.5911 18.2262 9.25977 17.8949 9.25977 17.4861V11.4861C9.25977 11.0774 9.5911 10.7461 9.99982 10.7461ZM13.9998 10.7461C14.4085 10.7461 14.7399 11.0774 14.7399 11.4861V17.4861C14.7399 17.8949 14.4085 18.2262 13.9998 18.2262C13.5911 18.2262 13.2598 17.8949 13.2598 17.4861V11.4861C13.2598 11.0774 13.5911 10.7461 13.9998 10.7461Z"
                        fill="#1F3044"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-6 flex min-w-[350px] max-w-[500px] flex-[1] flex-col gap-6 rounded-lg border border-main-blue p-6 text-main-blue">
        <div className="flex flex-col gap-3">
          <h3 className="text-h3 font-bold leading-3">Cart Summary</h3>
          <div className="flex flex-col">
            <div className="flex h-9 flex-row items-end justify-between">
              <span>Subtotal</span>
              <span>${calcSubTotal()}</span>
            </div>
            <div className="flex h-9 flex-row items-end justify-between">
              <span>Shipping</span>
              <span>${getShipping()}</span>
            </div>{" "}
            <div className="flex h-9 flex-row items-end justify-between">
              <span>Total</span>
              <span>${calcTotal()}</span>
            </div>
          </div>
        </div>

        <button className="h-9 w-full rounded-lg bg-main-blue text-white">
          Check Out
        </button>
        <button>Or pay with Paypal</button>
        <form className="flex flex-col gap-1 border-t border-t-main-blue pt-4">
          <label htmlFor="code" className="">
            Promo code
          </label>
          <div className="flex flex-row gap-3">
            <input
              name="code"
              type="text"
              className="h-9 w-full rounded-lg border border-main-blue bg-white px-4 py-2 text-main-blue placeholder-main-blue"
              placeholder="Enter Code"
            />
            <button className="rounded-lg bg-main-blue px-4 py-2 text-white">
              Apply
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
