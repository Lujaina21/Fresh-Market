import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import Signup from "./Components/Signup/Signup";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Wishlist from "./Components/Wishlist/Wishlist";
import AllOrders from "./Components/AllOrders/AllOrders";
import Checkout from "./Components/Checkout/Checkout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Verify from "./Components/Verify/Verify";
import ResetPass from "./Components/ResetPass/ResetPass";
import { Offline } from "react-detect-offline";

function App() {
  const queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productDetails/:id/:category",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "signup",
          element: (
            <ProtectedAuth>
              <Signup />
            </ProtectedAuth>
          ),
        },
        {
          path: "forgetPass",
          element: (
            <ProtectedAuth>
              <ForgetPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "verifyPass",
          element: (
            <ProtectedAuth>
              <Verify />
            </ProtectedAuth>
          ),
        },
        {
          path: "resetPass",
          element: (
            <ProtectedAuth>
              <ResetPass />
            </ProtectedAuth>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <Offline>
          <div className="fixed bottom-1 left-1 px-3 py-2 rounded-lg bg-red-600 text-white">
            You're offline right now. Check your internet connection.
          </div>
        </Offline>
        <Toaster position="top-right" reverseOrder={true} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
