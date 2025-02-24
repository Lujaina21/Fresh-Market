import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [cartID, setCartID] = useState(null);
  let headers = { token: localStorage.getItem("userToken") };

  async function toggleWishlist(productId, isInWishlist) {
    if (isInWishlist) {
      //remove wishlist
      return await axios
        .delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          {
            headers,
          }
        )
        .then((response) => {
          console.log(
            "Product removed from wishlist, the remaining items: ",
            response.data.data.length
          );
          toast.success("Product removed from wishlist ✅");
          setNumOfWishlistItems(response.data.data.length);
          return response.data;
        })
        .catch((err) => {
          console.log("Error toggling wishlist: ", err);
          toast.error("Failed to remove from wishlist ❌");
          return err;
        });
    } else {
      //add wishlist
      return await axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId },
          { headers }
        )
        .then((response) => {
          console.log(
            "Product added to wishlist, total num:",
            response.data.data.length
          );
          toast.success("Product added to wishlist ✅");
          setNumOfWishlistItems(response.data.data.length);
          return response.data;
        })
        .catch((err) => {
          console.log("Error toggling wishlist: ", err);
          toast.error("Failed to add to wishlist ❌");
          return err;
        });
    }
  }

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((response) => {
        // console.log("Add to Cart: ", response);
        toast.success(response.data.message);
        setCartID(response.data.data._id);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.data.message);
        return err;
      });
  }

  async function getCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        // console.log("Get Cart" , response);
        toast.success(response.data.message);
        setCartID(response.data.data._id);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.data.message);
        return err;
      });
  }

  async function removeCartItem(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        // console.log("Item Removed" , response);
        toast.success(response.data.status);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.data.status);
        return err;
      });
  }

  async function updateCartItem(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => {
        // console.log("Item Updated" , response);
        toast.success(response.data.status);
        setCartID(response.data.data._id);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        // console.log(err);
        toast.error(response.data.status);
        return err;
      });
  }

  async function clearAllCartItems() {
    return await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        console.log("Cart Cleared!", response);
        toast.success(response.data.status);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        console.log(err);
        toast.error(response.data.status);
        return err;
      });
  }

  async function onlinePayment(shippingAddress) {
    if (!cartID) {
      toast.error("Cart is empty or not loaded yet :/");
      return;
    }
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      )
      .then((response) => {
        console.log("Online Payment: ", response);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        toast.success("Redirecting to online payment ✅..");
        window.location.href = response.data.session.url;
        return response;
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to initiate online payment ❌");
        return err;
      });
  }

  async function cashPayment(shippingAddress) {
    if (!cartID) {
      toast.error("Cart is empty or not loaded yet :/");
      return;
    }
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        { shippingAddress },
        { headers }
      )
      .then((response) => {
        console.log("Cash Payment: ", response);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        toast.success("Your payment done successfully ✅..");
        window.location.href = "http://localhost:5173/AllOrders";
        return response;
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to initiate cash payment ❌");
        return err;
      });
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        onlinePayment,
        cashPayment,
        getCart,
        removeCartItem,
        updateCartItem,
        clearAllCartItems,
        toggleWishlist,
        numOfCartItems,
        totalPrice,
        numOfWishlistItems,
        setNumOfWishlistItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
