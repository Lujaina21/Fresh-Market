import React, { useContext, useEffect, useState } from "react";
import "./AllOrders.module.css";
import ordersImg from "./../../assets/successOrders.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  return (
    <>
      <div className="container mx-auto my-10 flex flex-col content-center items-center">
        <h2 className="text-main text-3xl font-bold text-center my-5">
          Congratulations!
        </h2>
        <img src={ordersImg} alt="Orders" className="w-5/12 mx-auto" />
        <h2 className="text-center text-main font-bold text-3xl my-3">
          Your payment has been processed successfully.
        </h2>
        <Link to="/">
          <button className="px-6 py-3 mb-10 mt-5 font-bold bg-main text-white rounded-xl transition-all duration-500 transform hover:scale-110">
            Shopping Now
          </button>
        </Link>
        <Helmet>
          <meta charSet="utf-8" />
          <title>FreshCart - Payment Successful</title>
        </Helmet>
      </div>
    </>
  );
}
