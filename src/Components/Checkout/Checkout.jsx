import React, { useContext, useEffect, useState } from "react";
import "./Checkout.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const [paymentType, setPaymentType] = useState(null);
  let { onlinePayment, cashPayment } = useContext(CartContext);
  // let location = useLocation();
  // console.log(location);  //hytba3ly state.type=> cash payment
  let { state } = useLocation();
  //console.log(state.type);

  useEffect(() => {
    setPaymentType(state.type);
  }, [state]);

  let mySchema = Yup.object({
    details: Yup.string()
      .required("Details is required!")
      .matches(/^[A-Za-z0-9\s,.!?-]+$/, "Invalid Details.."),
    phone: Yup.string()
      .required("Phone Number is required!")
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid Phone Number.."),
    city: Yup.string()
      .required("City is required!")
      .matches(/^[A-Za-z\s]+$/, "Invalid City.."),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    validationSchema: mySchema,
    onSubmit: (values) => {
      PayOnline(values);
    },
  });

  async function PayOnline(values) {
    // await onlinePayment(values);
    if (paymentType == "Online Payment") {
      await onlinePayment(values);
    } else if (paymentType == "Cash Payment") {
      await cashPayment(values);
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto">
        <Helmet>
          <meta charSet="utf-8" />
          <title>FreshCart - {paymentType || `Payment`}</title>
        </Helmet>
        <h2 className="text-main font-bold text-3xl my-10">{paymentType}</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Details Field */}
          <div className="relative z-0 w-full my-3 group">
            <input
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
            <label
              htmlFor="details"
              className="absolute text-lg font-bold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600"
            >
              Details
            </label>

            {formik.touched.details && formik.errors.details ? (
              <div
                className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="font-bold">{formik.errors.details}</div>
              </div>
            ) : null}
          </div>

          {/* Phone Field */}
          <div class="relative z-0 w-full my-12 group">
            <div>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              <label
                htmlFor="details"
                className="absolute text-lg font-bold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600"
              >
                Phone Number
              </label>
            </div>

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
                <div className="font-bold">{formik.errors.phone}</div>
              </div>
            ) : null}
          </div>

          {/* City Field */}
          <div class="relative z-0 w-full my-12 group">
            <div>
              <input
                type="text"
                id="city"
                name="city"
                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              <label
                htmlFor="city"
                className="absolute text-lg font-bold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600"
              >
                City
              </label>
            </div>

            {formik.touched.city && formik.errors.city ? (
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
                <div className="font-bold">{formik.errors.city}</div>
              </div>
            ) : null}
          </div>

          <div className="my-5 text-end">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="bg-main text-white px-4 py-2 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
