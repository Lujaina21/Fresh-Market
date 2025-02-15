import React, { useState } from "react";
import "./Verify.module.css";
import verifyImg from "./../../assets/verify.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  let navigate = useNavigate();

  async function handleVerification(e) {
    e.preventDefault();
    setIsLoading(true);

    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: code,
      })
      .then((response) => {
        //console.log(response);
        toast.success("Verification successful ✅");
        setTimeout(() => {
          navigate("/resetPass");
        }, 1000);
      })
      .catch((err) => {
        //console.log(err);
        toast.error("Verification failed ❌");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="container mt-44 md:mt-9 flex flex-col md:flex-row gap-6 mx-2 md:mx-12 w-full">
        <div className="flex justify-start flex-col items-start">
          <div>
            <h1 className="text-xl text-gray-800 font-semibold my-3">
              Enter your verification code:
            </h1>
          </div>
          <div className="my-6">
            <form className="max-w-md" onSubmit={handleVerification}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="block py-2.5 px-0 w-full text-lg font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <label
                  htmlFor="code"
                  className="peer-focus:font-medium absolute text-lg font-bold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Verification Code
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 text-white px-4 py-2 duration-300 rounded-lg hover:bg-emerald-700 transition-all"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
        <div>
          <img src={verifyImg} alt="Verify" className="w-[30rem] mx-12" />
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Verfication Code</title>
      </Helmet>
    </>
  );
}
