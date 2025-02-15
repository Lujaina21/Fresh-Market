import React, { useState } from "react";
import "./ResetPass.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";

export default function ResetPass() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email address"),
    newPassword: Yup.string()
      .required("Password is required!")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Not Valid Password!"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },

    validationSchema: mySchema,
    onSubmit: (values) => {
      resetUserPass(values);
    },
  });

  async function resetUserPass(values) {
    setIsLoading(true);
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((response) => {
        toast.success("Your password was successfully changed ✅");
        console.log(response.data, "Response: ");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error("Unable to update your data ❌");
        console.log(err, "Response Error: ");
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
              Reset your account password
            </h1>
          </div>
          <div className="my-4">
            <form className="max-w-md" onSubmit={formik.handleSubmit}>
              {/* Email Field */}
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
                    className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                    role="alert"
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* NewPassword Field */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="block py-2.5 px-0 w-full text-lg font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  required
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="newPassword"
                  className="peer-focus:font-medium absolute text-lg font-bold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  New Password
                </label>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div
                    className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                    role="alert"
                  >
                    {formik.errors.newPassword}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 text-white px-4 py-2 duration-300 rounded-lg hover:bg-emerald-700 transition-all"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
