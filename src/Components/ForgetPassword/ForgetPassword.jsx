import React, { useState } from "react";
import "./ForgetPassword.module.css";
import forgetPassImg from "./../../assets/forgot-password-concept-illustration_114360-1095.avif";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email address"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: mySchema,
    onSubmit: (values) => {
      takeUserEmail(values);
    },
  });

  async function takeUserEmail(values) {
    setIsLoading(true);
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((response) => {
        toast.success("Verification code sent to your email ✅");
        console.log(response.data, "Response: ");
        setTimeout(() => {
          navigate("/verifyPass");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Something went wrong ❌");
        console.log(error, "Response Error: ");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Reset Password</title>
      </Helmet>
      <div className="container mt-44 md:mt-9 flex flex-col md:flex-row gap-6 mx-2 md:mx-12 w-full">
        <div className="flex justify-start flex-col items-start">
          <div>
            <h1 className="text-xl text-gray-800 font-semibold my-3">
              Please enter your email, to recieve a verification code:
            </h1>
          </div>
          <div className="my-4">
            <form className="max-w-md" onSubmit={formik.handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-lg font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-lg font-bold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>

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
                    <div className="font-bold text-md">
                      {formik.errors.email}
                    </div>
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 text-white px-4 py-2 duration-300 rounded-lg hover:bg-emerald-700 transition-all"
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </button>
            </form>
          </div>
        </div>
        <div>
          <img
            src={forgetPassImg}
            alt="Forget Password"
            className="w-96 mx-12"
          />
        </div>
      </div>
    </>
  );
}
