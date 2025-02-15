import React, { useState } from "react";
import "./Signup.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Signup() {
  const [userMsg, setUserMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  // function validate(values) {
  //   let errors = {};

  //   //name validation
  //   if (!values.name) {
  //     errors.name = "Name is required!";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name length must be at least 3 char.";
  //   }

  //   //email validation
  //   if (!values.email) {
  //     errors.email = "Email is required!";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Invalid email address!";
  //   }

  //   //password validation
  //   if (!values.password) {
  //     errors.password = "Password is required!";
  //   } else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
  //     errors.password = "Invalid Password!";
  //   }

  //   //rePassword validation
  //   if (!values.rePassword) {
  //     errors.rePassword = "Re-password is required!";
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = "Invalid Password!";
  //   }

  //   //phone validation
  //   if (!values.phone) {
  //     errors.phone = "Phone Number is required!";
  //   } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = "Invalid Phone Number!";
  //   }

  //   return errors;
  // }
  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .min(3, "Not less than 3 characters")
      .max(10, "Not more than 10 characters"),
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required!")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Not Vaild Password!"),
    rePassword: Yup.string()
      .required("Please confirm your password!")
      .oneOf([Yup.ref("password")], "Passwords must match, please try again !"),
    phone: Yup.string()
      .required("Phone Number is required!")
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone number!"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    /*
    //**used for validation without yup
    validate,
    */
    validationSchema: mySchema,
    onSubmit: (values) => {
      signupForm(values);
    },
  });

  async function signupForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        //console.log(data.data.message);
        setUserMsg(data.data.message);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        //console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Sign Up</title>
      </Helmet>
      <div className="w-1/2 mx-auto">
        <h1 className="text-3xl text-main font-semibold my-3">Register Now:</h1>
        {/* Display User Msg */}
        {userMsg ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
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
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <p className="text-center font-semibold capitalize text-[1rem]">
              {errorMsg} !
            </p>
          </div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="my-3">
            <label
              htmlFor="name"
              className="mb-2 text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {formik.touched.name && formik.errors.name ? (
              <div
                class="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                <div>{formik.errors.name}</div>
              </div>
            ) : null}
          </div>

          {/* Email Field */}
          <div className="my-3">
            <label
              htmlFor="email"
              className="mb-2 text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {formik.touched.email && formik.errors.email ? (
              <div
                class="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                <div>{formik.errors.email}</div>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {formik.touched.password && formik.errors.password ? (
              <div
                class="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                <div>{formik.errors.password}</div>
              </div>
            ) : null}
          </div>

          {/* Re-Password Field */}
          <div className="my-3">
            <label
              htmlFor="rePassword"
              className="mb-2 text-gray-900 dark:text-white"
            >
              Re-Password
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div
                class="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                <div>{formik.errors.rePassword}</div>
              </div>
            ) : null}
          </div>

          {/* Phone Field */}
          <div className="my-3">
            <label
              htmlFor="phone"
              className="mb-2 text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {formik.touched.phone && formik.errors.phone ? (
              <div
                class="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                <div>{formik.errors.phone}</div>
              </div>
            ) : null}
          </div>

          <div className="my-5 text-end">
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
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
