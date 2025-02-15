import React, { useContext, useState } from "react";
import "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { token, setToken } = useContext(TokenContext);
  const [userMsg, setUserMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required!")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Not Vaild Password!"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        console.log(data.data.token);
        //1- save to Local Storage
        localStorage.setItem("userToken", data.data.token);
        //2- save to Token Context
        setToken(data.data.token);
        setUserMsg(data.data.message);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Log In</title>
      </Helmet>
      <div className="w-1/2 mx-auto">
        <h1 className="text-3xl text-main font-semibold my-3">Login Now:</h1>
        {/* Display User Msg */}
        {userMsg ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            <p className="text-center font-semibold capitalize text-[1rem]">
              {userMsg} !
            </p>
          </div>
        ) : null}

        {/* Display Error Msg */}
        {errorMsg ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <p className="text-center font-semibold capitalize text-[1rem]">
              {errorMsg} !
            </p>
          </div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="my-3">
            <label htmlFor="email" className="mb-2 text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-emerald-500 focus:outline-none focus:border-emerald-600"
            />

            {formik.touched.email && formik.errors.email ? (
              <div
                class="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div className="font-bold text-md">{formik.errors.email}</div>
              </div>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="my-3">
            <label
              htmlFor="password"
              className="mb-2 text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-emerald-500 focus:outline-none focus:border-emerald-600"
            />

            {formik.touched.password && formik.errors.password ? (
              <div
                class="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div className="font-bold text-md">
                  {formik.errors.password}
                </div>
              </div>
            ) : null}
          </div>

          <div className="my-5 flex justify-end items-center gap-5">
            <div className="transform hover:scale-110 ease-in-out transition-all duration-300">
              <Link
                to="/forgetPass"
                className="text-main font-bold text-md hover:text-emerald-700 "
              >
                Forget Password
              </Link>
            </div>
            <div>
              {isLoading ? (
                <button
                  type="submit"
                  className="bg-main text-white px-4 py-2 rounded-lg"
                >
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="bg-main text-white px-4 py-2 rounded-lg"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
