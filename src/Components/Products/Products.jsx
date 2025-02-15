import React, { useContext, useEffect, useState } from "react";
import "./Products.module.css";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Products() {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart, toggleWishlist } = useContext(CartContext);

  //fn kobry 3shan mynf3sh ab3t el addToCart la2enha async w lazem a7ot ablha await fa h3ml fn kobry 3shan admn elawait
  async function addToCartProduct(productId) {
    let response = await addToCart(productId);
    console.log(response);
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["ProductsKey"],
    queryFn: getProducts,
  });
  // console.log(data?.data?.data);

  //fn kobry
  // async function handleWishlist(productId, isInWishlist) {
  //   try {
  //     await toggleWishlist(productId, isInWishlist);
  //   } catch (err) {
  //     console.log("Error toggling wishlist: ", err);
  //   }
  // }

  async function handleWishlist(productId) {
    try {
      await toggleWishlist(productId, wishlist.includes(productId));
      setWishlist(
        (prevWishlist) =>
          wishlist.includes(productId)
            ? prevWishlist.filter((id) => id !== productId) //remove
            : [...prevWishlist, productId] //add
      );
    } catch (err) {
      console.log("Error toggling wishlist: ", err);
    }
  }

  //getting wishlist => DidMount
  async function fetchWishlist() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("userToken") } }
      );
      setWishlist(response.data.data.map((item) => item._id));
    } catch (err) {
      console.log("Error fetching wishlist: ", err);
    }
  }
  useEffect(() => {
    fetchWishlist();
  }, []);

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // async function getProducts() {
  //   return await axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((data) => {
  //       console.log(data.data.data);
  //       setProducts(data.data.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Products</title>
      </Helmet>
      {isError ? <p>{error.message}</p> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-3">
          {data?.data?.data.map((product) => (
            <div key={product._id} className="cursor-pointer">
              <div className="product px-2 py-3 rounded-lg">
                <Link
                  to={`/productDetails/${product._id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-[250px] object-cover mb-4"
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-main mt-2">
                      {product.category.name}
                    </h3>
                    <h2 className="font-semibold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h5 className="font-mono text-lg">{product.price} EGP</h5>
                    <div className="text-gray-600 font-semibold">
                      {product.ratingsAverage}
                      <i className="rating-color fa fa-star ms-1"></i>
                    </div>
                  </div>
                </Link>
                <div className="w-full">
                  <div className="w-3/4 me-2">
                    <button
                      onClick={() => addToCartProduct(product._id)}
                      className="btn bg-main w-full rounded-lg text-white px-3 py-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                  {/* Heart Icon */}
                  <div className="ms-auto -mt-9 text-2xl w-1/5">
                    <button onClick={() => handleWishlist(product._id)}>
                      <i
                        className={`fa-solid fa-heart btn hover:animate-bounce ${
                          wishlist.includes(product._id)
                            ? "text-red-700"
                            : "text-gray-500"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
