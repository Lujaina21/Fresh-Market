import React, { useContext, useState } from "react";
import "./Navbar.module.css";
import logo from "./../../assets/shopping-cart.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { useEffect } from "react";

export default function Navbar() {
  let { numOfCartItems, getCart, numOfWishlistItems } = useContext(CartContext);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let navigate = useNavigate();
  let { token, setToken } = useContext(TokenContext);
  console.log(token);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  async function getAllCartNum() {
    let response = await getCart();
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getAllCartNum();
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={` dark:bg-gray-900 fixed transition-all duration-500 ${
          isScrolling === false ? "py-3 bg-white" : "py-1 bg-gray-100"
        } w-full z-20 top-0 start-0`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <Link
            to="/"
            className="flex items-center space-x-0 rtl:space-x-reverse"
          >
            <img src={logo} className="w-16" alt="Fresh Cart Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              Fresh<span className="text-main">Cart</span>
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 md:flex-row md:mt-0 border-0">
              {token ? (
                <ul className="flex content-center items-center">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "me-3 text-main text-3xl transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                          : "me-3 text-gray-500 text-3xl transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                      }
                      to="cart"
                    >
                      <div className="relative me-2">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="absolute -top-1 left-3 bg-green-100 text-green-800 text-xs font-bold mx-2 px-2.5 py-0.5 rounded-full border-1 border-green-700">
                          {numOfCartItems}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-gray-500 font-semibold transition-all duration-300"
                      onClick={() => logout()}
                      to="#"
                    >
                      Log Out
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink
                      to="login"
                      className={({ isActive }) =>
                        isActive
                          ? "text-main transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                          : "text-gray-500 transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }
                    >
                      LogIn
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="signup"
                      className={({ isActive }) =>
                        isActive
                          ? "text-main transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                          : "text-gray-500 transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              )}
            </ul>
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            {token ? (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                  <NavLink
                    to="/"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-main transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                        : "text-gray-500 transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                    }
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-main transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                        : "text-gray-500 transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="products"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-main transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                        : "text-gray-500 transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-main transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                        : "text-gray-500 transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                    }
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="wishlist"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "relative text-main transition-all duration-300 block font-semibold py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                        : "relative text-gray-500 transition-all duration-300 font-semibold block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main md:p-0 "
                    }
                  >
                    Wishlist
                    <span className="absolute top-0 left-16 bg-green-100 text-green-800 text-xs font-bold mx-3 md:mx-2 px-2.5 py-0.5 rounded-full border-1 border-green-700">
                      {numOfWishlistItems}
                    </span>
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
