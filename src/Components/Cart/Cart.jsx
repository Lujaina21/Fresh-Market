import React, { useContext, useEffect, useState } from "react";
import "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import noCartImg from "./../../assets/emptyCart.webp";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdwnOpen, setDropdwnOpen] = useState(false);
  let {
    getCart,
    removeCartItem,
    updateCartItem,
    clearAllCartItems,
    totalPrice,
  } = useContext(CartContext);

  function toggleDropdwn() {
    setDropdwnOpen(!dropdwnOpen);
  }

  async function getAllCart() {
    let response = await getCart();
    console.log(response);
    setIsLoading(false);
    setCartItems(response.data.data.products);
  }

  async function removeCart(productId) {
    let response = await removeCartItem(productId);
    setCartItems(response.data.data.products);
  }

  async function updateCart(productId, count) {
    let response = await updateCartItem(productId, count);
    setCartItems(response.data.data.products);
  }

  async function clearAllProducts() {
    await clearAllCartItems();
    setCartItems([]);
  }

  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Cart</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : cartItems.length === 0 ? (
        <div className="text-center">
          <img src={noCartImg} alt="No orders" className="mx-auto my-5 w-96" />
          <p className="text-center font-bold text-2xl text-gray-700 my-8">
            Looks like you haven't added any products to your cart yet!
          </p>
          <Link to="/">
            <button className="px-6 py-3 mb-10 font-bold bg-main text-white rounded-xl transition-all duration-500 transform hover:scale-110">
              Shopping Now
            </button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="text-end my-5">
            <button
              onClick={() => clearAllProducts()}
              className="text-white px-7 py-2 bg-red-700 rounded-xl hover:bg-red-600 transition-all duration-300"
            >
              Clear All
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="text-center">
                <th scope="col" className="px-16 py-3 text-[17px] font-bold">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 text-[17px] font-bold">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-[17px] font-bold">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-[17px] font-bold">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3 text-[17px] font-bold">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3 text-[17px] font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cartItems.map((item) => (
                <tr
                  key={item.product.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={item.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateCart(item.product.id, item.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{item.count}</span>
                      </div>
                      <button
                        onClick={() =>
                          updateCart(item.product.id, item.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price} EGP
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price * item.count} EGP
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => removeCart(item.product.id)}
                      className="font-semibold text-red-600 hover:underline"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
              <tr className="bg-white text-xl border-b text-center font-extrabold border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-3 text-main">TOTAL PRICE</td>
                <td colSpan="4" className="px-6 py-3 text-gray-900">
                  {totalPrice} EGP
                </td>
                <td>
                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    onClick={() => toggleDropdwn()}
                    className="px-10 py-2 text-white hover:text-white bg-main rounded-lg text-md transition-all duration-300 hover:opacity-80 text-center inline-flex items-center"
                    type="button"
                  >
                    Pay Now
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    id="dropdown"
                    className={`z-10 bg-gray-200 divide-y rounded-lg shadow-sm w-48 translate-x-8 ${
                      dropdwnOpen ? "block" : "hidden"
                    }`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-600 font-[Merienda] "
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <Link
                          to="/checkout"
                          state={{ type: "Online Payment" }}
                          className="block px-4 py-2 hover:bg-gray-300"
                        >
                          Online Payment
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/checkout"
                          state={{ type: "Cash Payment" }}
                          className="block px-4 py-2 hover:bg-gray-300"
                        >
                          Cash Payment
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
