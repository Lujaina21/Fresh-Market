import React from "react";
import "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-200 text-black p-11">
        <h2 className="font-semibold text-gray-900 text-2xl mb-3">
          Get the Fresh<span className="text-main">Cart</span> app
        </h2>
        <p className="text-gray-700">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="md:flex items-center content-center my-5 mx-auto ms-4">
          <div className="w-3/4 me-6">
            <input
              type="email"
              name="email"
              placeholder="Email .."
              className="rounded-md border-gray-300 w-full border-2 mb-3 transition-all duration-300 outline-none focus:shadow-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className="md:w-1/4">
            <button className="bg-main px-11 py-2 text-white rounded-md mb-3 hover:opacity-90 transition-all duration-300">
              Share App Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
