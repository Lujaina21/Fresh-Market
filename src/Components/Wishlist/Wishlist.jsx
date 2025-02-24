import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import emptyWishlistImg from "./../../assets/noOrders.jpeg";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { addToCart, toggleWishlist, setNumOfWishlistItems } =
    useContext(CartContext);

  const headers = { token: localStorage.getItem("userToken") };

  async function addToCartProduct(productId) {
    try {
      await addToCart(productId);
    } catch (err) {
      console.log("Error adding product to cart: ", err);
    }
  }

  async function getWishlistProducts() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => {
        setWishlistProducts(response.data.data);
        setNumOfWishlistItems(response.data.count || response.data.data.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching wishlist products: ", err);
        setIsLoading(false);
      });
  }

  async function handleWishlist(productId) {
    try {
      await toggleWishlist(productId, true);
      setWishlistProducts((currentProd) =>
        currentProd.filter((prod) => prod._id !== productId)
      );
      setNumOfWishlistItems((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.log("Error removing product from wishlist: ", err);
    }
  }

  useEffect(() => {
    getWishlistProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Wishlist</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : wishlistProducts.length === 0 ? (
        <div className="text-center font-bold text-2xl mt-4 mx-auto">
          <img
            src={emptyWishlistImg}
            alt="Empty WishList"
            className="mx-auto w-96"
          />
          <h2 className="text-gray-700 my-5">Your wishlist is empty!</h2>
        </div>
      ) : (
        <div>
          <h1 className="text-main font-bold text-center text-3xl my-6">
            My WishList
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-3">
            {wishlistProducts.map((product) => (
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
                    <div className="ms-auto -mt-9 text-2xl w-1/5">
                      <button onClick={() => handleWishlist(product._id)}>
                        <i className="fa-solid fa-heart btn text-red-700 hover:animate-bounce"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
